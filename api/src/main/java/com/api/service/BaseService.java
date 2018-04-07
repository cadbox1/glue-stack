package com.api.service;

import com.api.domain.entity.BaseEntity;
import com.api.domain.entity.BaseOrganisedEntity;
import com.api.domain.entity.User;
import com.api.repository.BaseRepository;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.PathBuilderFactory;
import java.lang.reflect.ParameterizedType;
import java.util.Optional;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

abstract public class BaseService<T extends BaseEntity> {

	@Autowired
	private EntityManager entityManager;
	@Autowired
	private BaseRepository<T, Integer> baseRepository;

	private Class<T> entityClass = (Class<T>) ((ParameterizedType) getClass().getGenericSuperclass())
			.getActualTypeArguments()[0];

	public Page<T> findAll(User principalUser, Predicate predicate, Pageable pageRequest) {
		BooleanBuilder builder = new BooleanBuilder(predicate);
		builder.and(getReadPermissionPredicate(principalUser));
		return baseRepository.findAll(builder, pageRequest);
	}

	public Optional<T> findById(User principalUser, Integer id) {
		// this is the hack until this is fixed: https://github.com/querydsl/querydsl/issues/2115
		Predicate findOnePredicate = new PathBuilderFactory().create(entityClass).get("id").eq(id);
		Page<T> result = findAll(principalUser, findOnePredicate, PageRequest.of(0, 1));
		if (result.hasContent()) {
			return Optional.of(result.iterator().next());
		}
		return Optional.empty();
	}

	public T save(User principalUser, T newEntity) {
		return saveAndPreparePreviousVersion(principalUser, newEntity);
	}

	private T saveAndPreparePreviousVersion(User principalUser, T newEntity) {
		T oldEntity = null;
		if (newEntity.getId() != null) {
			if (this.entityManager.contains(newEntity)) {
				entityManager.detach(newEntity);
			}
			Optional<T> oldEntityOptional = findById(principalUser, newEntity.getId());
			if (!oldEntityOptional.isPresent()) {
				throw new EntityNotFoundException();
			}
			oldEntity = oldEntityOptional.get();
		}
		return saveWithPreviousVersion(principalUser, newEntity, oldEntity);
	}

	private T saveWithPreviousVersion(User principalUser, T newEntity, T oldEntity) {
		prepareSaveData(principalUser, newEntity, oldEntity);
		validateChanges(principalUser, newEntity, oldEntity);
		return baseRepository.save(newEntity);
	}

	protected void validateChanges(User principalUser, T newEntity, T oldEntity) {
		validateOrganisationChange(principalUser, newEntity, oldEntity);
	}

	private void validateOrganisationChange(User principalUser, T newEntity, T oldEntity) {
		if (oldEntity != null) {
			if (oldEntity instanceof BaseOrganisedEntity) {
				BaseOrganisedEntity oldEntityCasted = (BaseOrganisedEntity) oldEntity;
				BaseOrganisedEntity newEntityCasted = (BaseOrganisedEntity) newEntity;
				if (oldEntityCasted.getOrganisation() == null) {
					throw new RuntimeException("Current organised entity has no organisation");
				}
				// this really should have been covered in the read permission predicate
				if (!oldEntityCasted.getOrganisation().getId().equals(principalUser.getOrganisation().getId())) {
					throw new RuntimeException("This entity is not in your organisation");
				}
				if (!oldEntityCasted.getOrganisation().getId().equals(newEntityCasted.getOrganisation().getId())) {
					throw new RuntimeException("You can't change an entity's organisation");
				}
			}
		}
	}

	protected void prepareSaveData(User principalUser, T newEntity, T oldEntity) {
		if (oldEntity == null) {
			// new entity
			if (newEntity instanceof BaseOrganisedEntity) {
				if (principalUser.getOrganisation() == null) {
					throw new RuntimeException("Principal user has no organisation to assign the new entity to");
				}
				BaseOrganisedEntity newEntityCasted = (BaseOrganisedEntity) newEntity;
				newEntityCasted.setOrganisation(principalUser.getOrganisation());
				newEntity = (T) newEntityCasted;
			}
		}
	}

	abstract public Predicate getReadPermissionPredicate(User principalUser);
}
