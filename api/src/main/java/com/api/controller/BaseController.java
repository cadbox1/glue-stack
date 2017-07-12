package com.api.controller;

import com.api.domain.entity.User;
import com.api.service.BaseService;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.Serializable;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class BaseController<T, ID extends Serializable> {

	@Autowired
	protected BaseService<T, ID> baseService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public T findOne(Authentication authentication, @PathVariable ID id) {
		User principalUser = (User) authentication.getPrincipal();
		return baseService.findOne(principalUser, id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public T create(Authentication authentication, @RequestBody @Valid T entity) {
		User principalUser = (User) authentication.getPrincipal();
		return baseService.create(principalUser, entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
	public T patch(Authentication authentication, @PathVariable ID id, @RequestBody JsonNode patchedFields)
			throws Exception {
		User principalUser = (User) authentication.getPrincipal();
		return baseService.patch(principalUser, id, patchedFields);
	}

}
