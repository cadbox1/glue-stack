package com.api.repository;

import com.api.domain.entity.User;
import java.util.Collection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends BaseRepository<User, Integer> {

	User findOneByEmail(String email);

	@Query(value = "SELECT DISTINCT u2.`id` \n" +
			"FROM `user` u1\n" +
			"LEFT JOIN `user_userGroup` uug1 ON u1.`id` = uug1.`userId`\n" +
			"INNER JOIN `user_permission` up1 ON up1.`userId` = u1.`id` OR uug1.`userGroupId` = up1.`userGroupId`\n" +
			"LEFT JOIN `user_userGroup` uug2 ON uug2.`userGroupId` = up1.`targetUserGroupId`\n" +
			"INNER JOIN `user` u2 ON uug2.`userId`  = u2.`id` OR up1.`targetUserId` = u2.`id`\n" +
			"WHERE u1.`id` = :userId\n" +
			"AND u2.`organisationId` = u1.`organisationId`\n" +
			"AND up1.`readPermission` = 1", nativeQuery = true)
	Collection<Integer> findAllAuthorisedUserIdsForUser(@Param("userId") Integer userId);

}
