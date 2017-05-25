package com.api.controller;

import com.api.domain.entity.TaskSchedule;
import com.api.domain.entity.User;
import com.api.service.TaskScheduleService;
import com.querydsl.core.types.Predicate;
import java.security.Principal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.querydsl.binding.QuerydslPredicate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by cchristo on 17/03/2017.
 */
@RestController
@RequestMapping("api/taskSchedules")
public class TaskScheduleController extends BaseController<TaskSchedule, Integer> {

	@Autowired
	private TaskScheduleService taskScheduleService;

	@RequestMapping(method = RequestMethod.GET)
	public Page<TaskSchedule> findAll(
			Principal principal,
			@QuerydslPredicate Predicate predicate,
			Pageable pageRequest) {
		User principalUser = (User) principal;
		return taskScheduleService.findAll(principalUser, predicate, pageRequest);
	}

}
