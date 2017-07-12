package com.api.domain.entity;

import com.api.domain.entity.authorization.TaskPermission;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * The persistent class for the task database table.
 * 
 */
@Entity
@Table(name = "task")
@NamedQuery(name = "Task.findAll", query = "SELECT t FROM Task t")
public class Task extends BaseOrganisedEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(length = 255)
	private String notes;

	//bi-directional many-to-many association to TaskGroup
	@ManyToMany
	@JoinTable(name = "task_taskGroup", joinColumns = {
			@JoinColumn(name = "taskId", nullable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "taskGroupId", nullable = false) })
	private List<TaskGroup> taskGroups;

	//bi-directional many-to-one association to TaskSchedule
	@OneToMany(mappedBy = "task")
	private List<TaskSchedule> taskSchedules;

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

	public List<TaskGroup> getTaskGroups() {
		return this.taskGroups;
	}

	public void setTaskGroups(List<TaskGroup> taskGroups) {
		this.taskGroups = taskGroups;
	}

	public List<TaskSchedule> getTaskSchedules() {
		return this.taskSchedules;
	}

	public void setTaskSchedules(List<TaskSchedule> taskSchedules) {
		this.taskSchedules = taskSchedules;
	}

	public TaskSchedule addTaskSchedule(TaskSchedule taskSchedule) {
		getTaskSchedules().add(taskSchedule);
		taskSchedule.setTask(this);

		return taskSchedule;
	}

	public TaskSchedule removeTaskSchedule(TaskSchedule taskSchedule) {
		getTaskSchedules().remove(taskSchedule);
		taskSchedule.setTask(null);

		return taskSchedule;
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