package com.api.domain.entity.authorization;

import com.api.domain.entity.BaseEntity;
import com.api.domain.entity.Tag;
import com.api.domain.entity.Task;
import com.api.domain.entity.User;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "taskPermission")
public class TaskPermission extends BaseEntity {
	private static final long serialVersionUID = 1L;

	private Boolean executePermission;

	private Boolean readPermission;

	private Boolean writePermission;

	//bi-directional many-to-one association to Task
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "targetTaskId")
	private Task task;

	//bi-directional many-to-one association to TaskGroup
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "targetTagId")
	private Tag tag;

	//bi-directional many-to-one association to User
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userId")
	private User user;

	public TaskPermission() {
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

	public Boolean getExecutePermission() {
		return executePermission;
	}

	public void setExecutePermission(Boolean executePermission) {
		this.executePermission = executePermission;
	}

	public Boolean getReadPermission() {
		return readPermission;
	}

	public void setReadPermission(Boolean readPermission) {
		this.readPermission = readPermission;
	}

	public Boolean getWritePermission() {
		return writePermission;
	}

	public void setWritePermission(Boolean writePermission) {
		this.writePermission = writePermission;
	}

	public Tag getTag() {
		return tag;
	}

	public void setTag(Tag tag) {
		this.tag = tag;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}