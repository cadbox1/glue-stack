package com.api.domain.entity;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.Valid;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;

@Entity
@Table(name = "organisation")
public class Organisation extends BaseEntity {
	private static final long serialVersionUID = 1L;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(nullable = false)
	private Integer statusId = 1;

	//bi-directional many-to-one association to Task
	@OneToMany(mappedBy = "organisation")
	private List<Task> tasks = new ArrayList<>();

	//bi-directional many-to-one association to User
	@Valid
	@Cascade(CascadeType.ALL)
	@OneToMany(mappedBy = "organisation")
	private List<User> users = new ArrayList<>();

	public Organisation() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getStatusId() {
		return this.statusId;
	}

	public void setStatusId(Integer statusId) {
		this.statusId = statusId;
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

}