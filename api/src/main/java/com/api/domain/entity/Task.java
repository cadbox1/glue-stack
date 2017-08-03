package com.api.domain.entity;

import com.api.domain.entity.authorization.TaskPermission;
import java.io.Serializable;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "task")
public class Task extends BaseOrganisedEntity {
	private static final long serialVersionUID = 1L;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(length = 255)
	private String notes;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userId", nullable = false)
	private User user;

	//bi-directional many-to-many association to TaskGroup
	@ManyToMany
	@JoinTable(name = "task_tag", joinColumns = {
			@JoinColumn(name = "taskId", nullable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "tagId", nullable = false) })
	private List<Tag> tags;

	//bi-directional many-to-one association to TaskPermission
	@OneToMany(mappedBy = "task")
	private List<TaskPermission> taskPermissions;

	public Task() {
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNotes() {
		return this.notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}

	public List<TaskPermission> getTaskPermissions() {
		return this.taskPermissions;
	}

	public void setTaskPermissions(List<TaskPermission> taskPermissions) {
		this.taskPermissions = taskPermissions;
	}

	public TaskPermission addTaskPermission(TaskPermission taskPermission) {
		getTaskPermissions().add(taskPermission);
		taskPermission.setTask(this);

		return taskPermission;
	}

	public TaskPermission removeTaskPermission(TaskPermission taskPermission) {
		getTaskPermissions().remove(taskPermission);
		taskPermission.setTask(null);

		return taskPermission;
	}

}