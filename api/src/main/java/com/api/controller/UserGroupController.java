package com.api.controller;

import com.api.domain.entity.User;
import com.api.domain.entity.UserGroup;
import com.api.domain.entity.UserGroupAggregate;
import com.api.domain.entity.UserGroupBase;
import com.api.service.UserGroupService;
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
 * Created by cchristo on 11/04/2017.
 */
@RestController
@RequestMapping("api/groups")
public class UserGroupController extends BaseController<UserGroupBase, Integer> {

	@Autowired
	private UserGroupService userGroupService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<UserGroup> findAll(Authentication authentication, @QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) authentication.getPrincipal();
		return userGroupService.findAll(principalUser, UserGroup.class, predicate, pageRequest);
	}

	@RequestMapping(params = "view=fancy", method = RequestMethod.GET)
	public Page<UserGroupAggregate> findAllFancy(Authentication authentication, @QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) authentication.getPrincipal();
		return userGroupService.findAll(principalUser, UserGroupAggregate.class, predicate, pageRequest);
	}
}
