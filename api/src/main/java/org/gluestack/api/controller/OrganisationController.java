package org.gluestack.api.controller;

import javax.validation.Valid;
import org.gluestack.api.domain.entity.Organisation;
import org.gluestack.api.service.OrganisationService;
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
public class OrganisationController extends BaseController<Organisation> {

	@Autowired
	private OrganisationService organisationService;

	@Override
	@RequestMapping(method = RequestMethod.POST)
	public Organisation create(Authentication authentication, @RequestBody @Valid Organisation entity) {
		Organisation organisation = organisationService.create(entity);
		organisation.setUsers(null); // this is a bit of a hack to fix some serialisation issues.
		return organisation;
	}
}
