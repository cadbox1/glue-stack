package com.api.service;

import com.api.domain.entity.QUser;
import com.api.domain.entity.User;
import com.api.domain.other.Permission;
import com.api.repository.UserRepository;
import com.querydsl.core.types.Predicate;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Created by cchristo on 17/03/2017.
 */
@Service
public class UserService extends BaseService<User, Integer> {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public Predicate getPermissionPredicate(User principalUser, Permission permission) {
		return QUser.user.organisation.id.eq(principalUser.getOrganisation().getId());
	}

	@Override
	public User save(User principalUser, User newUser, User oldUser) {
		if (oldUser == null || !oldUser.getPassword().equals(newUser.getPassword())) {
			newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
		}
		return super.save(principalUser, newUser, oldUser);
	}

	public Iterable<User> save(Iterable<User> users) {
		Iterator<User> emailCheckIterator = users.iterator();
		Set<String> emails = new HashSet<>();
		while (emailCheckIterator.hasNext()) {
			User user = emailCheckIterator.next();
			if (!emails.add(user.getEmail())) {
				// duplicate found, throw exception
			}
		}
		return userRepository.saveAll(users);
	}
}
