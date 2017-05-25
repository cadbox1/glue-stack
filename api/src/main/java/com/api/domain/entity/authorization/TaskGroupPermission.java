package com.api.domain.entity.authorization;

import com.api.domain.entity.TaskGroup;
import com.api.domain.entity.User;
import com.api.domain.entity.UserGroup;
import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQuery;
import javax.persistence.Table;


/**
 * The persistent class for the taskGroup_permission database table.
 * 
 */
@Entity
@Table(name="taskGroup_permission")
@NamedQuery(name="TaskGroup_permission.findAll", query="SELECT t FROM TaskGroupPermission t")
public class TaskGroupPermission implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(unique=true, nullable=false)
	private Integer id;

	private Boolean read;

	private Boolean write;

	//bi-directional many-to-one association to TaskGroup
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="targetTaskGroupId")
	private TaskGroup taskGroup;

	//bi-directional many-to-one association to User
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="userId")
	private User user;

	//bi-directional many-to-one association to UserGroup
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="userGroupId")
	private UserGroup userGroup;

	public TaskGroupPermission() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getRead() {
		return this.read;
	}

	public void setRead(Boolean read) {
		this.read = read;
	}

	public Boolean getWrite() {
		return this.write;
	}

	public void setWrite(Boolean write) {
		this.write = write;
	}

	public TaskGroup getTaskGroup() {
		return this.taskGroup;
	}

	public void setTaskGroup(TaskGroup taskGroup) {
		this.taskGroup = taskGroup;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public UserGroup getUserGroup() {
		return this.userGroup;
	}

	public void setUserGroup(UserGroup userGroup) {
		this.userGroup = userGroup;
	}

}