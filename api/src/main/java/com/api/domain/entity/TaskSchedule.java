package com.api.domain.entity;

import java.io.Serializable;
import java.util.Date;
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
import javax.persistence.Temporal;
import javax.persistence.TemporalType;


/**
 * The persistent class for the taskSchedule database table.
 * 
 */
@Entity
@Table(name="taskSchedule")
@NamedQuery(name="TaskSchedule.findAll", query="SELECT t FROM TaskSchedule t")
public class TaskSchedule implements Serializable {
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

	@Temporal(TemporalType.TIMESTAMP)
	private Date scheduledDate;

	@Column(nullable=false)
	private Integer statusID;

	private Integer timeToComplete;

	//bi-directional many-to-one association to Organisation
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="organisationId", nullable=false)
	private Organisation organisation;

	//bi-directional many-to-one association to Task
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="taskId", nullable=false)
	private Task task;

	//bi-directional many-to-one association to User
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="userId", nullable=false)
	private User user;

	public TaskSchedule() {
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

	public Date getScheduledDate() {
		return this.scheduledDate;
	}

	public void setScheduledDate(Date scheduledDate) {
		this.scheduledDate = scheduledDate;
	}

	public Integer getStatusID() {
		return this.statusID;
	}

	public void setStatusID(Integer statusID) {
		this.statusID = statusID;
	}

	public Integer getTimeToComplete() {
		return this.timeToComplete;
	}

	public void setTimeToComplete(Integer timeToComplete) {
		this.timeToComplete = timeToComplete;
	}

	public Organisation getOrganisation() {
		return this.organisation;
	}

	public void setOrganisation(Organisation organisation) {
		this.organisation = organisation;
	}

	public Task getTask() {
		return this.task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	public User getUser() {
		return this.user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}