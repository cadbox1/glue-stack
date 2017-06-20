package com.api.service;

import com.api.domain.entity.QUser;
import com.api.repository.UserRepository;
import com.api.domain.entity.User;
import com.api.domain.other.Permission;
import com.querydsl.core.types.Predicate;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by cchristo on 17/03/2017.
 */
@Service
@Transactional
public class UserService extends BaseService<User, Integer> {

	@Autowired
	private UserRepository userRepository;

	@Override
	public Predicate getPermissionPredicate(User principalUser, Permission permission) {
		return null; //QUser.user.id.in(userRepository.findAllAuthorisedUserIdsForUser(principalUser.getId()));
	}

	public Page<User> findAllWithGroups(User principalUser, Predicate predicate, Pageable pageRequest) {
		Page<User> users = super.findAll(principalUser, predicate, pageRequest);
		for (User user : users.getContent()) {
			Hibernate.initialize(user.getUserGroups());
		}
		return users;
	}

	public User save(User user) {
		List<User> users = new ArrayList<>();
		users.add(user);
		return save(users).iterator().next();
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
		return userRepository.save(users);
	}
}
