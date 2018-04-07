package com.api.service;

import com.api.domain.entity.Organisation;
import com.api.domain.entity.QOrganisation;
import com.api.domain.entity.User;
import com.api.repository.OrganisationRepository;
import com.querydsl.core.types.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by cchristo on 23/5/17.
 */
@Service
public class OrganisationService extends BaseService<Organisation> {

	@Autowired
	private OrganisationRepository organisationRepository;
	@Autowired
	private UserService userService;

	@Override
	public Predicate getReadPermissionPredicate(User principalUser) {
		return QOrganisation.organisation.id.eq(principalUser.getOrganisation().getId());
	}

	public Organisation create(Organisation organisation) {
		User user = organisation.getUsers().get(0);
		user.setOrganisation(organisation);
		userService.preparePassword(user, null);
		return organisationRepository.save(organisation);
	}
}
