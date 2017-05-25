package com.api.controller;

import com.api.domain.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by cchristo on 17/5/17.
 */
@RestController
@RequestMapping("api/authenticate")
public class AuthenticationController {

	@RequestMapping(method = RequestMethod.GET)
	public User authenticate(Authentication authentication) {
		User principalUser = (User) authentication.getPrincipal();
		return principalUser;
	}
}
