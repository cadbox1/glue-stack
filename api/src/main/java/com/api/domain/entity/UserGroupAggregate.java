package com.api.domain.entity;

import javax.persistence.Entity;
import javax.persistence.Table;
import org.hibernate.annotations.Formula;

/**
 * Created by cchristo on 11/04/2017.
 */
@Entity
@Table(name="userGroup")
public class UserGroupAggregate extends UserGroupBase {

	@Formula("(select count(0) from user_userGroup uug where uug.userGroupId = id)")
	private Integer userCount;

	public Integer getUserCount() {
		return userCount;
	}

	public void setUserCount(Integer userCount) {
		this.userCount = userCount;
	}
}
