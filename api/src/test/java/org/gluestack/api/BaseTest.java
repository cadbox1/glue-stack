package org.gluestack.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import javax.transaction.Transactional;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
@SpringBootTest
@Transactional
@TestPropertySource(locations = "classpath:application-test.properties")
@Sql(scripts = "/seed-data.sql", config = @SqlConfig(commentPrefix = "`", separator = "@@"))
public abstract class BaseTest {

	@Autowired
	protected MockMvc mvc;

	@Autowired
	protected ObjectMapper objectMapper;

	@Autowired
	private TestOrganisationService testOrganisationService;

	protected TestOrganisation testOrganisation;
	protected TestOrganisation otherTestOrganisation;

	@Before
	public void setup() {
		testOrganisation = testOrganisationService.createTestOrganisiation();
		otherTestOrganisation = testOrganisationService.createTestOrganisiation();
	}
}
