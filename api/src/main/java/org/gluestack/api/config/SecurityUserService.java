package org.gluestack.api.config;

import org.gluestack.api.domain.entity.User;
import org.gluestack.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 * 
 * @author cchristo
 *
 */
@Service
public class SecurityUserService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findOneByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("Username " + email + " not found");
		}
		return user;
	}
}
