package com.api.domain.entity;

import com.api.domain.entity.authorization.TaskPermission;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "tag")
public class Tag extends BaseOrganisedEntity {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@Column(unique = true, nullable = false)
	private Integer id;

	@Column(nullable = false, length = 255)
	private String name;

	@Column(length = 255)
	private String notes;

	//bi-directional many-to-many association to Task
	@ManyToMany(mappedBy = "tags")
	private List<Task> tasks;

	//bi-directional many-to-one association to TaskPermission
	@OneToMany(mappedBy = "tag")
	private List<TaskPermission> taskPermissions;

	Tag() {
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

	public List<Task> getTasks() {
		return this.tasks;
	}

	public void setTasks(List<Task> tasks) {
		this.tasks = tasks;
	}

	public List<TaskPermission> getTaskPermissions() {
		return taskPermissions;
	}

	public void setTaskPermissions(List<TaskPermission> taskPermissions) {
		this.taskPermissions = taskPermissions;
	}
}