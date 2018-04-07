package com.api.service;

import com.api.domain.entity.QUser;
import com.api.domain.entity.User;
import com.querydsl.core.types.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Created by cchristo on 17/03/2017.
 */
@Service
public class UserService extends BaseService<User> {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public Predicate getReadPermissionPredicate(User principalUser) {
		return QUser.user.organisation.id.eq(principalUser.getOrganisation().getId());
	}

	@Override
	public void prepareSaveData(User principalUser, User newEntity, User oldEntity) {
		preparePassword(newEntity, oldEntity);
		super.prepareSaveData(principalUser, newEntity, oldEntity);
	}

	public void preparePassword(User newUser, User oldUser) {
		if (oldUser == null || !oldUser.getPassword().equals(newUser.getPassword())) {
			newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
		}
	}
}
