package com.api.service;

import com.api.domain.entity.Organisation;
import com.api.domain.entity.User;
import com.api.domain.entity.authorization.TaskPermission;
import com.api.domain.entity.authorization.UserPermission;
import com.api.domain.other.Permission;
import com.api.repository.OrganisationRepository;
import com.querydsl.core.types.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Created by cchristo on 23/5/17.
 */
@Service
public class OrganisationService extends BaseService<Organisation, Integer> {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private OrganisationRepository organisationRepository;

	@Override
	public Predicate getPermissionPredicate(User principalUser, Permission permission) {
		return null;
	}

	@Override
	public Organisation create(Organisation organisation) {

		organisation.setStatusID(1);

		User user = organisation.getUsers().get(0);

		user.setOrganisation(organisation);
		user.setPassword(passwordEncoder.encode(user.getPassword()));

		TaskPermission taskPermission = new TaskPermission();
		taskPermission.setRead(true);
		taskPermission.setWrite(true);
		taskPermission.setExecute(true);
		user.addTaskPermission(taskPermission);

		UserPermission userPermission = new UserPermission();
		userPermission.setRead(true);
		userPermission.setWrite(true);
		userPermission.setExecute(true);
		user.addUserPermissions(userPermission);

		return organisationRepository.save(organisation);
	}
}
