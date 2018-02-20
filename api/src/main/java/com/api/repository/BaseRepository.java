package com.api.repository;

import java.io.Serializable;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<T, ID extends Serializable>
	extends CrudRepository<T, ID>, QuerydslPredicateExecutor<T> {

}
