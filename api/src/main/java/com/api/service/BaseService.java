package com.api.service;

import com.api.repository.BaseRepository;
import com.api.domain.entity.User;
import com.api.domain.other.Permission;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import java.io.IOException;
import java.io.Serializable;
import java.lang.reflect.ParameterizedType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.support.Repositories;
import org.springframework.web.context.WebApplicationContext;


abstract public class BaseService<T, ID extends Serializable> {

	private ObjectMapper objectMapper;
	private Class<T> defaultEntityClass = null;
	private Repositories repositories = null;

	@Autowired
	public void init(WebApplicationContext appContext, ObjectMapper objectMapper) {
		this.objectMapper = objectMapper;
		this.repositories = new Repositories(appContext);
		this.defaultEntityClass = (Class<T>) ((ParameterizedType) getClass()
				.getGenericSuperclass()).getActualTypeArguments()[0];
	}

	private <E extends T, F extends BaseRepository<E, ID>> F getRepository(Class<E> entityClass) {
		return (F) repositories.getRepositoryFor(entityClass);
	}

	private BaseRepository<T, ID> getDefaultRepository() {
		return getRepository(this.defaultEntityClass);
	}

	public <E extends T> Page<E> findAll(
			User principalUser,
			Class<E> entityClass,
			Predicate predicate,
			Pageable pageRequest) {
		BooleanBuilder builder = new BooleanBuilder(predicate);
		builder.and(getPermissionPredicate(principalUser, Permission.READ));
		Page<E> result = getRepository(entityClass).findAll(builder, pageRequest);
		return result;
	}

	public Page<T> findAll(User principalUser, Predicate predicate, Pageable pageRequest) {
		return findAll(principalUser, defaultEntityClass, predicate, pageRequest);
	}

	public T findOne(ID id) {
		return getDefaultRepository().findOne(id);
	}

	public T create(T entity) {
		return getDefaultRepository().save(entity);
	}

	public T update(T entity) {
		return getDefaultRepository().save(entity);
	}

	public Iterable<T> save(Iterable<T> entities) {
		return getDefaultRepository().save(entities);
	}

	public T patch(ID id, JsonNode patchedFields) throws IOException {
		T entity = getDefaultRepository().findOne(id);
		T updatedEntity = objectMapper.readerForUpdating(entity).readValue(patchedFields);
		return update(updatedEntity);
	}

	abstract public Predicate getPermissionPredicate(User principalUser, Permission permission);
}
