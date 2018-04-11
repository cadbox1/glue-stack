package org.gluestack.api.service;

import com.querydsl.core.types.Predicate;
import org.gluestack.api.domain.entity.Organisation;
import org.gluestack.api.domain.entity.QOrganisation;
import org.gluestack.api.domain.entity.User;
import org.gluestack.api.repository.OrganisationRepository;
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
