package com.api.service;

import com.api.domain.entity.QTask;
import com.api.domain.entity.Task;
import com.api.domain.entity.User;
import com.api.domain.other.Permission;
import com.querydsl.core.types.Predicate;

import org.hibernate.Hibernate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Created by cchristo on 11/04/2017.
 */
@Service
public class TaskService extends BaseService<Task, Integer> {

	@Override
	public Predicate getPermissionPredicate(User principalUser, Permission permission) {
		return QTask.task.organisation.id.eq(principalUser.getOrganisation().getId());
	}

	@Override
	public Page<Task> findAll(User principalUser, Predicate predicate, Pageable pageRequest) {
		Page<Task> tasks = super.findAll(principalUser, predicate, pageRequest);
		tasks.getContent().stream().forEach(task -> Hibernate.initialize(task.getUser()));
		return tasks;
	}

	@Override
	public Task findOne(User principalUser, Integer id) {
		Task task = super.findOne(principalUser, id);
		Hibernate.initialize(task.getUser());
		return task;
	}
}
