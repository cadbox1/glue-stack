package com.api.domain.entity;

import com.api.domain.entity.authorization.TaskGroupPermission;
import com.api.domain.entity.authorization.TaskPermission;
import com.api.domain.entity.authorization.UserGroupPermission;
import com.api.domain.entity.authorization.UserPermission;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@Table(name="user")
public class User extends BaseEntity implements Serializable, UserDetails {
	private static final long serialVersionUID = 1L;

	@Column(nullable=false, length=255)
	private String email;

	@Column(nullable=false, length=255)
	private String firstName;

	@Column(nullable=false, length=255)
	private String lastName;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Column(nullable=false, length=60)
	private String password;

	//bi-directional many-to-one association to Organisation
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="organisationId", nullable=false)
	private Organisation organisation;

	//bi-directional many-to-many association to UserGroup
	@ManyToMany
	@JoinTable(
			name="user_userGroup"
			, joinColumns={
			@JoinColumn(name="userId", nullable=false)
	}
			, inverseJoinColumns={
			@JoinColumn(name="userGroupId", nullable=false)
	}
	)
	private List<UserGroup> userGroups = new ArrayList<>();

	//bi-directional many-to-one association to TaskSchedule
	@OneToMany(mappedBy="user")
	private List<TaskSchedule> taskSchedules = new ArrayList<>();

	//bi-directional many-to-one association to TaskPermission
	@Cascade(CascadeType.ALL)
	@OneToMany(mappedBy="user")
	private List<TaskPermission> taskPermissions = new ArrayList<>();

	//bi-directional many-to-one association to TaskGroup_permission
	@Cascade(CascadeType.ALL)
	@OneToMany(mappedBy="user")
	private List<TaskGroupPermission> taskGroupPermissions = new ArrayList<>();

	//bi-directional many-to-one association to UserPermission
	@Cascade(CascadeType.ALL)
	@OneToMany(mappedBy="user")
	private List<UserPermission> userPermissions = new ArrayList<>();

	//bi-directional many-to-one association to UserGroup_permission
	@Cascade(CascadeType.ALL)
	@OneToMany(mappedBy="user")
	private List<UserGroupPermission> userGroupPermissions = new ArrayList<>();

	//bi-directional many-to-one association to UserPermission
	@OneToMany(mappedBy="targetUser")
	private List<UserPermission> userPermissionsTargettingThisUser = new ArrayList<>();

	public User() {
	}

	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<TaskGroupPermission> getTaskGroupPermissions() {
		return this.taskGroupPermissions;
	}

	public void setTaskGroupPermissions(List<TaskGroupPermission> taskGroupPermissions) {
		this.taskGroupPermissions = taskGroupPermissions;
	}

	public TaskGroupPermission addTaskGroupPermission(TaskGroupPermission taskGroupPermission) {
		getTaskGroupPermissions().add(taskGroupPermission);
		taskGroupPermission.setUser(this);

		return taskGroupPermission;
	}

	public TaskGroupPermission removeTaskGroupPermission(TaskGroupPermission taskGroupPermission) {
		getTaskGroupPermissions().remove(taskGroupPermission);
		taskGroupPermission.setUser(null);

		return taskGroupPermission;
	}

	public List<TaskSchedule> getTaskSchedules() {
		return this.taskSchedules;
	}

	public void setTaskSchedules(List<TaskSchedule> taskSchedules) {
		this.taskSchedules = taskSchedules;
	}

	public TaskSchedule addTaskSchedule(TaskSchedule taskSchedule) {
		getTaskSchedules().add(taskSchedule);
		taskSchedule.setUser(this);

		return taskSchedule;
	}

	public TaskSchedule removeTaskSchedule(TaskSchedule taskSchedule) {
		getTaskSchedules().remove(taskSchedule);
		taskSchedule.setUser(null);

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
		taskPermission.setUser(this);

		return taskPermission;
	}

	public TaskPermission removeTaskPermission(TaskPermission taskPermission) {
		getTaskPermissions().remove(taskPermission);
		taskPermission.setUser(null);

		return taskPermission;
	}

	public Organisation getOrganisation() {
		return this.organisation;
	}

	public void setOrganisation(Organisation organisation) {
		this.organisation = organisation;
	}

	public List<UserGroup> getUserGroups() {
		return this.userGroups;
	}

	public void setUserGroups(List<UserGroup> userGroups) {
		this.userGroups = userGroups;
	}

	public List<UserGroupPermission> getUserGroupPermissions() {
		return this.userGroupPermissions;
	}

	public void setUserGroupPermissions(List<UserGroupPermission> userGroupPermissions) {
		this.userGroupPermissions = userGroupPermissions;
	}

	public UserGroupPermission addUserGroupPermission(UserGroupPermission userGroupPermission) {
		getUserGroupPermissions().add(userGroupPermission);
		userGroupPermission.setUser(this);

		return userGroupPermission;
	}

	public UserGroupPermission removeUserGroupPermission(UserGroupPermission userGroupPermission) {
		getUserGroupPermissions().remove(userGroupPermission);
		userGroupPermission.setUser(null);

		return userGroupPermission;
	}

	public List<UserPermission> getUserPermissions() {
		return this.userPermissions;
	}

	public void setUserPermissions(List<UserPermission> userPermissions1) {
		this.userPermissions = userPermissions1;
	}

	public UserPermission addUserPermissions(UserPermission userPermissions1) {
		getUserPermissions().add(userPermissions1);
		userPermissions1.setUser(this);

		return userPermissions1;
	}

	public UserPermission removeUserPermissions(UserPermission userPermissions1) {
		getUserPermissions().remove(userPermissions1);
		userPermissions1.setUser(null);

		return userPermissions1;
	}

	public List<UserPermission> getUserPermissionsTargettingThisUser() {
		return this.userPermissionsTargettingThisUser;
	}

	public void setUserPermissionsTargettingThisUser(List<UserPermission> userPermissions2) {
		this.userPermissionsTargettingThisUser = userPermissions2;
	}

	public UserPermission addUserPermissionsTargettingThisUser(UserPermission userPermissions2) {
		getUserPermissionsTargettingThisUser().add(userPermissions2);
		userPermissions2.setTargetUser(this);

		return userPermissions2;
	}

	public UserPermission removeUserPermissionsTargettingThisUser(UserPermission userPermissions2) {
		getUserPermissionsTargettingThisUser().remove(userPermissions2);
		userPermissions2.setTargetUser(null);

		return userPermissions2;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return null;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return this.getActive();
	}

}