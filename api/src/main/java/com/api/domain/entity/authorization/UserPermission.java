package com.api.domain.entity.authorization;

import com.api.domain.entity.BaseEntity;
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
import javax.persistence.Table;


/**
 * The persistent class for the user_permission database table.
 * 
 */
@Entity
@Table(name="user_permission")
public class UserPermission extends BaseEntity implements Serializable {
	private static final long serialVersionUID = 1L;

	private Integer childEntity;

	private Boolean executePermission;

	private Boolean readPermission;

	private Boolean writePermission;

	//bi-directional many-to-one association to UserGroup
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="targetUserGroupId")
	private UserGroup targetUserGroup;

	//bi-directional many-to-one association to User
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="userId")
	private User user;

	//bi-directional many-to-one association to User
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="targetUserId")
	private User targetUser;

	//bi-directional many-to-one association to UserGroup
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="userGroupId")
	private UserGroup userGroup;

	public UserPermission() {
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

	public void setExecute(Boolean execute) {
		this.executePermission = execute;
	}

	public Boolean getRead() {
		return this.readPermission;
	}

	public void setRead(Boolean read) {
		this.readPermission = read;
	}

	public Boolean getWrite() {
		return this.writePermission;
	}

	public void setWrite(Boolean write) {
		this.writePermission = write;
	}

	public UserGroup getTargetUserGroup() {
		return this.targetUserGroup;
	}

	public void setTargetUserGroup(UserGroup targetUserGroup) {
		this.targetUserGroup = targetUserGroup;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public User getTargetUser() {
		return this.targetUser;
	}

	public void setTargetUser(User targetUser) {
		this.targetUser = targetUser;
	}

	public UserGroup getUserGroup() {
		return this.userGroup;
	}

	public void setUserGroup(UserGroup userGroup) {
		this.userGroup = userGroup;
	}

}