package com.api;

import com.api.domain.entity.Organisation;
import com.api.domain.entity.Task;
import com.api.domain.entity.User;
import com.api.repository.OrganisationRepository;
import com.api.repository.TaskRepository;
import com.api.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
@TestPropertySource(locations = "classpath:application-integrationtest.properties")
public abstract class BaseTest {

	@Autowired
	protected MockMvc mvc;

	@Autowired
	protected ObjectMapper objectMapper;

	@Autowired
	private OrganisationRepository organisationRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TaskRepository taskRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	protected User user;
	protected Task task;

	@Before
	public void setup() {
		Organisation organisation = new Organisation();
		organisation.setName("organisation");
		organisationRepository.save(organisation);

		user = new User();
		user.setEmail("email");
		user.setPassword(passwordEncoder.encode("password"));
		user.setFirstName("test");
		user.setLastName("user");
		user.setOrganisation(organisation);
		userRepository.save(user);

		task = new Task();
		task.setName("task");
		task.setNotes("notes");
		task.setStatusId(1);
		task.setUser(user);
		task.setOrganisation(organisation);
		taskRepository.save(task);
	}
}
