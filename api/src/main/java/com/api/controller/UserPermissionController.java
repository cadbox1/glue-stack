package com.api.controller;

import com.api.domain.entity.User;
import com.api.domain.entity.authorization.UserPermission;
import com.api.service.UserPermissionService;
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
@RequestMapping("api/userPermissions")
public class UserPermissionController extends BaseController<UserPermission, Integer> {

	@Autowired
	private UserPermissionService userPermissionService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<UserPermission> findAll(
			Principal principal,
			@QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) principal;
		return userPermissionService.findAll(principalUser, predicate, pageRequest);
	}

}
