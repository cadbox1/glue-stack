package com.api.controller;

import com.api.domain.entity.BaseEntity;
import com.api.domain.entity.User;
import com.api.service.BaseService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
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

	@RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
	public T patch(Authentication authentication, @PathVariable Integer id, @RequestBody JsonNode patchedFields)
			throws Exception {
		User principalUser = (User) authentication.getPrincipal();
		Optional<T> entity = baseService.findById(principalUser, id);
		if (!entity.isPresent()) {
			throw new EntityNotFoundException();
		}
		T updatedEntity = objectMapper.readerForUpdating(entity.get()).readValue(patchedFields);
		return baseService.save(principalUser, updatedEntity);
	}

}
