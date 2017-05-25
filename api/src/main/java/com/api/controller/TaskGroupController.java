package com.api.controller;

import com.api.domain.entity.TaskGroup;
import com.api.domain.entity.User;
import com.api.service.TaskGroupService;
import com.querydsl.core.types.Predicate;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by cchristo on 17/03/2017.
 */
@RestController
@RequestMapping("api/taskGroups")
public class TaskGroupController extends BaseController<TaskGroup, Integer> {

	@Autowired
	private TaskGroupService taskGroupService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<TaskGroup> findAll(
			Principal principal,
			@QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) principal;
		return taskGroupService.findAll(principalUser, predicate, pageRequest);
	}

}
