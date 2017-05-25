package com.api.controller;

import com.api.domain.entity.User;
import com.api.service.UserService;
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
@RequestMapping("api/users")
public class UserController extends BaseController<User, Integer> {

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<User> findAll(
			Authentication authentication,
			@QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) authentication.getPrincipal();
		return userService.findAll(principalUser, predicate, pageRequest);
	}

	@RequestMapping(params = "view=fancy", method = RequestMethod.GET)
	public Page<User> findAllWithGroups(
			Authentication authentication,
			@QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) authentication.getPrincipal();
		return userService.findAllWithGroups(principalUser, predicate, pageRequest);
	}

}
