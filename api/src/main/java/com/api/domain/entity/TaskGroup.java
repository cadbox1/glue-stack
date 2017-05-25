package com.api.domain.entity;

import com.api.domain.entity.authorization.TaskGroupPermission;
import com.api.domain.entity.authorization.TaskPermission;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the taskGroup database table.
 * 
 */
@Entity
@Table(name="taskGroup")
@NamedQuery(name="TaskGroup.findAll", query="SELECT t FROM TaskGroup t")
public class TaskGroup implements Serializable {
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

	//bi-directional many-to-many association to Task
	@ManyToMany(mappedBy="taskGroups")
	private List<Task> tasks;

	//bi-directional many-to-one association to TaskGroup_permission
	@OneToMany(mappedBy="taskGroup")
	private List<TaskGroupPermission> taskGroupPermissions;

	//bi-directional many-to-one association to TaskPermission
	@OneToMany(mappedBy="taskGroup1")
	private List<TaskPermission> taskPermissions1;

	//bi-directional many-to-one association to TaskPermission
	@OneToMany(mappedBy="taskGroup2")
	private List<TaskPermission> taskPermissions2;

	TaskGroup() {
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

	public List<TaskGroupPermission> getTaskGroupPermissions() {
		return this.taskGroupPermissions;
	}

	public void setTaskGroupPermissions(List<TaskGroupPermission> taskGroupPermissions) {
		this.taskGroupPermissions = taskGroupPermissions;
	}

	public TaskGroupPermission addTaskGroupPermission(TaskGroupPermission taskGroupPermission) {
		getTaskGroupPermissions().add(taskGroupPermission);
		taskGroupPermission.setTaskGroup(this);

		return taskGroupPermission;
	}

	public TaskGroupPermission removeTaskGroupPermission(TaskGroupPermission taskGroupPermission) {
		getTaskGroupPermissions().remove(taskGroupPermission);
		taskGroupPermission.setTaskGroup(null);

		return taskGroupPermission;
	}

	public List<TaskPermission> getTaskPermissions1() {
		return this.taskPermissions1;
	}

	public void setTaskPermissions1(List<TaskPermission> taskPermissions1) {
		this.taskPermissions1 = taskPermissions1;
	}

	public TaskPermission addTaskPermissions1(TaskPermission taskPermissions1) {
		getTaskPermissions1().add(taskPermissions1);
		taskPermissions1.setTaskGroup1(this);

		return taskPermissions1;
	}

	public TaskPermission removeTaskPermissions1(TaskPermission taskPermissions1) {
		getTaskPermissions1().remove(taskPermissions1);
		taskPermissions1.setTaskGroup1(null);

		return taskPermissions1;
	}

	public List<TaskPermission> getTaskPermissions2() {
		return this.taskPermissions2;
	}

	public void setTaskPermissions2(List<TaskPermission> taskPermissions2) {
		this.taskPermissions2 = taskPermissions2;
	}

	public TaskPermission addTaskPermissions2(TaskPermission taskPermissions2) {
		getTaskPermissions2().add(taskPermissions2);
		taskPermissions2.setTaskGroup2(this);

		return taskPermissions2;
	}

	public TaskPermission removeTaskPermissions2(TaskPermission taskPermissions2) {
		getTaskPermissions2().remove(taskPermissions2);
		taskPermissions2.setTaskGroup2(null);

		return taskPermissions2;
	}
}