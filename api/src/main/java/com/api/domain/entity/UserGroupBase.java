package com.api.domain.entity;

import com.api.domain.entity.authorization.TaskGroupPermission;
import com.api.domain.entity.authorization.UserGroupPermission;
import com.api.domain.entity.authorization.UserPermission;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the userGroup database table.
 * 
 */
@MappedSuperclass
public class UserGroupBase implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(unique=true, nullable=false)
	private Integer id;

	@Column(nullable=false)
	private Boolean active;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable=false)
	private Date createdDate;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable=false)
	private Date modifiedDate;

	@Column(nullable=false, length=255)
	private String name;

	@Column(length=255)
	private String notes;

	//bi-directional many-to-one association to TaskGroup_permission
	@OneToMany(mappedBy="userGroup")
	private List<TaskGroupPermission> taskGroupPermissions;

	//bi-directional many-to-many association to User
	@ManyToMany(mappedBy="userGroups")
	private List<User> users;

	//bi-directional many-to-one association to Organisation
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="organisationId", nullable=false)
	private Organisation organisation;

	//bi-directional many-to-one association to UserGroup_permission
	@OneToMany(mappedBy="userGroup")
	private List<UserGroupPermission> userGroupPermissions;

	//bi-directional many-to-one association to UserPermission
	@OneToMany(mappedBy="targetUserGroup")
	private List<UserPermission> userPermissions;

	public UserGroupBase() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getActive() {
		return this.active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public Date getModifiedDate() {
		return this.modifiedDate;
	}

	public void setModifiedDate(Date modifiedDate) {
		this.modifiedDate = modifiedDate;
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

	public List<TaskGroupPermission> getTaskGroupPermissions() {
		return this.taskGroupPermissions;
	}

	public void setTaskGroupPermissions(List<TaskGroupPermission> taskGroupPermissions) {
		this.taskGroupPermissions = taskGroupPermissions;
	}

	public List<User> getUsers() {
		return this.users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public Organisation getOrganisation() {
		return this.organisation;
	}

	public void setOrganisation(Organisation organisation) {
		this.organisation = organisation;
	}

	public List<UserGroupPermission> getUserGroupPermissions() {
		return this.userGroupPermissions;
	}

	public void setUserGroupPermissions(List<UserGroupPermission> userGroupPermissions) {
		this.userGroupPermissions = userGroupPermissions;
	}

	public List<UserPermission> getUserPermissions() {
		return this.userPermissions;
	}

	public void setUserPermissions(List<UserPermission> userPermissions) {
		this.userPermissions = userPermissions;
	}

}