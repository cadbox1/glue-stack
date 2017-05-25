package com.api.service;

import com.api.domain.entity.TaskGroup;
import com.api.domain.entity.User;
import com.api.domain.other.Permission;
import com.querydsl.core.types.Predicate;
import org.springframework.stereotype.Service;

/**
 * Created by cchristo on 11/04/2017.
 */
@Service
public class TaskGroupService extends BaseService<TaskGroup, Integer> {

	@Override
	public Predicate getPermissionPredicate(User principalUser, Permission permission) {
		return null;
	}
}
