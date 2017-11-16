package com.api.domain.entity;

import com.api.config.UniqueEmailConstraint;
import com.api.domain.entity.authorization.TaskPermission;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.hibernate.validator.constraints.NotBlank;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "user")
public class User extends BaseOrganisedEntity implements UserDetails {
	private static final long serialVersionUID = 1L;

	@UniqueEmailConstraint
	@NotBlank
	@Column(nullable = false, unique = true, length = 255)
	private String email;

	@NotBlank
	@Column(nullable = false, length = 255)
	private String firstName;

	@Column(nullable = false, length = 255)
	private String lastName;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@NotBlank
	@Column(nullable = false, length = 60, columnDefinition = "CHAR(60)")
	private String password;

	//bi-directional many-to-one association to TaskSchedule
	@OneToMany(mappedBy = "user")
	private List<Task> tasks = new ArrayList<>();

	//bi-directional many-to-one association to TaskPermission
	@Cascade(CascadeType.ALL)
	@OneToMany(mappedBy = "user")
	private List<TaskPermission> taskPermissions = new ArrayList<>();

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

	public List<Task> getTasks() {
		return tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
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