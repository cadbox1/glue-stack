package com.api.config;

import com.api.repository.UserRepository;
import com.api.domain.entity.User;
import java.util.logging.Logger;
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
public class CustomUserDetailsService implements UserDetailsService {
	private static final Logger log = Logger.getLogger(CustomUserDetailsService.class.getName());
	
	@Autowired
	UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		User user = userRepository.findOneByEmail(email);
		if (user == null) {
			throw new UsernameNotFoundException("Username " + email + " not found");
		}
		return user;
	}
}
