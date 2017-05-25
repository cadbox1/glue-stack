package com.api.controller;

import com.api.service.BaseService;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.Serializable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

public class BaseController<T, ID extends Serializable> {

	@Autowired
	protected BaseService<T, ID> baseService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public T findOne(@PathVariable ID id) {
		return baseService.findOne(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public T create(@RequestBody T entity) {
		return baseService.create(entity);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PATCH)
	public T patch(@PathVariable ID id, @RequestBody JsonNode patchedFields) throws Exception {
		return baseService.patch(id, patchedFields);
	}

}
