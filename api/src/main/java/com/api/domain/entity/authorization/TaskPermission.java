package com.api.domain.entity.authorization;

import com.api.domain.entity.BaseEntity;
import com.api.domain.entity.Task;
import com.api.domain.entity.TaskGroup;
import com.api.domain.entity.User;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


/**
 * The persistent class for the task_permission database table.
 * 
 */
@Entity
@Table(name="task_permission")
public class TaskPermission extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer childEntity;

	private Boolean executePermission;

	private Boolean readPermission;

	private Boolean writePermission;

	//bi-directional many-to-one association to Task
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="targetTaskId")
	private Task task;

	//bi-directional many-to-one association to TaskGroup
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="userGroupId")
	private TaskGroup taskGroup1;

	//bi-directional many-to-one association to TaskGroup
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="targetTaskGroupId")
	private TaskGroup taskGroup2;

	//bi-directional many-to-one association to User
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="userId")
	private User user;

	public TaskPermission() {
	}

	public Integer getChildEntity() {
		return this.childEntity;
	}

	public void setChildEntity(Integer childEntity) {
		this.childEntity = childEntity;
	}

	public Boolean getExecute() {
		return this.executePermission;
	}

	public void setExecute(Boolean executePermission) {
		this.executePermission = executePermission;
	}

	public Boolean getRead() {
		return this.readPermission;
	}

	public void setRead(Boolean readPermission) {
		this.readPermission = readPermission;
	}

	public Boolean getWrite() {
		return this.writePermission;
	}

	public void setWrite(Boolean writePermission) {
		this.writePermission = writePermission;
	}

	public Task getTask() {
		return this.task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	public TaskGroup getTaskGroup1() {
		return this.taskGroup1;
	}

	public void setTaskGroup1(TaskGroup taskGroup1) {
		this.taskGroup1 = taskGroup1;
	}

	public TaskGroup getTaskGroup2() {
		return this.taskGroup2;
	}

	public void setTaskGroup2(TaskGroup taskGroup2) {
		this.taskGroup2 = taskGroup2;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}