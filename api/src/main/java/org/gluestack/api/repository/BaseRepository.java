package org.gluestack.api.repository;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<T> extends CrudRepository<T, Integer>, QuerydslPredicateExecutor<T> {

}
