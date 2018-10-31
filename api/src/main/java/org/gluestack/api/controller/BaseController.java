package org.gluestack.api.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.PathBuilderFactory;

import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import org.gluestack.api.domain.entity.BaseEntity;
import org.gluestack.api.domain.entity.User;
import org.gluestack.api.domain.other.BulkOperationRequest;
import org.gluestack.api.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

abstract public class BaseController<T extends BaseEntity> {

	@Autowired
	protected BaseService<T> baseService;
	@Autowired
	private ObjectMapper objectMapper;

	private Class<T> entityClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
			.getActualTypeArguments()[0];

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public T findById(Authentication authentication, @PathVariable Integer id) {
		User principalUser = (User) authentication.getPrincipal();
		Optional<T> result = baseService.findById(principalUser, id);
		if (result.isPresent()) {
			return result.get();
		}
		throw new EntityNotFoundException();
	}

	@RequestMapping(method = RequestMethod.POST)
	public T create(Authentication authentication, @RequestBody @Valid T entity) {
		User principalUser = (User) authentication.getPrincipal();
		return baseService.save(principalUser, entity);
	}

	@RequestMapping(method = RequestMethod.PATCH)
	public List<T> patchBulk(Authentication authentication, @RequestBody BulkOperationRequest bulkOperationRequest)
			throws Exception {
		User principalUser = (User) authentication.getPrincipal();
		Predicate targetsPredicate = new PathBuilderFactory().create(entityClass).get("id")
				.in(bulkOperationRequest.getIds());
		Page<T> targets = baseService.findAll(principalUser, targetsPredicate,
				PageRequest.of(0, bulkOperationRequest.getIds().size()));
		if (!Objects.equals(targets.getSize(), bulkOperationRequest.getIds().size())) {
			throw new EntityNotFoundException();
		}
		List<T> updatedTargets = new ArrayList<>();
		for (T target : targets) {
			updatedTargets.add(objectMapper.readerForUpdating(target).readValue(bulkOperationRequest.getBody()));
		}
		return baseService.saveAll(principalUser, updatedTargets);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
	public T patch(Authentication authentication, @PathVariable Integer id, @RequestBody JsonNode patchedFields)
			throws Exception {
		BulkOperationRequest bulkOperationRequest = new BulkOperationRequest();
		bulkOperationRequest.setIds(new ArrayList<>(Arrays.asList(id)));
		bulkOperationRequest.setBody(patchedFields);
		return patchBulk(authentication, bulkOperationRequest).get(0);
	}

}
