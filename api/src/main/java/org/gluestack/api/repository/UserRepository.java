package org.gluestack.api.repository;

import org.gluestack.api.domain.entity.User;
import org.springframework.data.jpa.repository.EntityGraph;

public interface UserRepository extends BaseRepository<User> {

	@EntityGraph(attributePaths = { "organisation" })
	User findOneByEmail(String email);
}
