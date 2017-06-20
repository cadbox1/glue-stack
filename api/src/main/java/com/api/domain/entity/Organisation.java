package com.api.domain.entity;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;
import javax.validation.constraints.Size;

import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

/**
 * The persistent class for the organisation database table.
 * 
 */
@Entity
@Table(name = "organisation")
public class Organisation extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(nullable = false)
	private Integer statusID;

	//bi-directional many-to-one association to Task
	@OneToMany(mappedBy = "organisation")
	private List<Task> tasks = new ArrayList<>();

	//bi-directional many-to-one association to TaskSchedule
	@OneToMany(mappedBy = "organisation")
	private List<TaskSchedule> taskSchedules = new ArrayList<>();

	//bi-directional many-to-one association to User
	@Valid
	@Cascade(CascadeType.ALL)
	@OneToMany(mappedBy = "organisation")
	private List<User> users = new ArrayList<>();

	//bi-directional many-to-one association to UserGroup
	@OneToMany(mappedBy = "organisation")
	private List<UserGroup> userGroups = new ArrayList<>();

	public Organisation() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getStatusID() {
		return this.statusID;
	}

	public void setStatusID(Integer statusID) {
		this.statusID = statusID;
	}

	public List<Task> getTasks() {
		return this.tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public Task addTask(Task task) {
		getTasks().add(task);
		task.setOrganisation(this);

		return task;
	}

	public Task removeTask(Task task) {
		getTasks().remove(task);
		task.setOrganisation(null);

		return task;
	}

	public List<TaskSchedule> getTaskSchedules() {
		return this.taskSchedules;
	}

	public void setTaskSchedules(List<TaskSchedule> taskSchedules) {
		this.taskSchedules = taskSchedules;
	}

	public TaskSchedule addTaskSchedule(TaskSchedule taskSchedule) {
		getTaskSchedules().add(taskSchedule);
		taskSchedule.setOrganisation(this);

		return taskSchedule;
	}

	public TaskSchedule removeTaskSchedule(TaskSchedule taskSchedule) {
		getTaskSchedules().remove(taskSchedule);
		taskSchedule.setOrganisation(null);

		return taskSchedule;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public User addUser(User user) {
		getUsers().add(user);
		user.setOrganisation(this);

		return user;
	}

	public User removeUser(User user) {
		getUsers().remove(user);
		user.setOrganisation(null);

		return user;
	}

	public List<UserGroup> getUserGroups() {
		return this.userGroups;
	}

	public void setUserGroups(List<UserGroup> userGroups) {
		this.userGroups = userGroups;
	}

	public UserGroup addUserGroup(UserGroup userGroup) {
		getUserGroups().add(userGroup);
		userGroup.setOrganisation(this);

		return userGroup;
	}

	public UserGroup removeUserGroup(UserGroup userGroup) {
		getUserGroups().remove(userGroup);
		userGroup.setOrganisation(null);

		return userGroup;
	}

}