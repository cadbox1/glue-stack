package com.api.controller;

import com.api.domain.entity.Organisation;
import com.api.domain.entity.User;
import com.api.service.OrganisationService;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by cchristo on 23/5/17.
 */
@RestController
@RequestMapping("api/organisations")
public class OrganisationController extends BaseController<Organisation, Integer> {

	@Autowired
	private OrganisationService organisationService;

	@Override
	@RequestMapping(method = RequestMethod.POST)
	public Organisation create(Authentication authentication, @RequestBody @Valid Organisation entity) {
		return organisationService.create(entity);
	}
}
