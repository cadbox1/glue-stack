package com.api.controller;

import com.api.domain.entity.Task;
import com.api.domain.entity.User;
import com.api.service.TaskService;
import com.querydsl.core.types.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by cchristo on 17/03/2017.
 */
@RestController
@RequestMapping("api/tasks")
public class TaskController extends BaseController<Task> {

	@Autowired
	private TaskService taskService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<Task> findAll(Authentication authentication, @QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) authentication.getPrincipal();
		return taskService.findAll(principalUser, predicate, pageRequest);
	}

}
