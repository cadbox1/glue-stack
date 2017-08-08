package com.api.repository;

import com.api.domain.entity.User;
import java.util.Collection;
import org.springframework.data.jpa.repository.EntityGraph;

public interface UserRepository extends BaseRepository<User, Integer> {

	@EntityGraph(attributePaths = { "organisation" })
	User findOneByEmail(String email);
}
