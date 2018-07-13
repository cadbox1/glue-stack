package org.gluestack.api.repository;

import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.dsl.StringPath;

import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface BaseRepository<T>
        extends CrudRepository<T, Integer>, QuerydslPredicateExecutor<T>, QuerydslBinderCustomizer<EntityPath<T>> {

    @Override
    default public void customize(QuerydslBindings bindings, EntityPath<T> root) {
        bindings.bind(String.class).first((StringPath path, String value) -> path.containsIgnoreCase(value));
    }
}
