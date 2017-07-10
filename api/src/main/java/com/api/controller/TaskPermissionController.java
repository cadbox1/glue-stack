package com.api.controller;

import com.api.domain.entity.User;
import com.api.domain.entity.authorization.TaskPermission;
import com.api.service.TaskPermissionService;
import com.querydsl.core.types.Predicate;
import java.security.Principal;
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
@RequestMapping("api/taskPermissions")
public class TaskPermissionController extends BaseController<TaskPermission, Integer> {

	@Autowired
	private TaskPermissionService taskPermissionService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<TaskPermission> findAll(Authentication authentication, @QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) authentication.getPrincipal();
		return taskPermissionService.findAll(principalUser, predicate, pageRequest);
	}

}
