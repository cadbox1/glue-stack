package org.gluestack.api.task;

import org.gluestack.api.BaseTest;
import org.gluestack.api.PageResponse;
import org.gluestack.api.domain.entity.Task;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

public class FindAllTest extends BaseTest {

	@Test
	public void findAllUsersTest() throws Exception {
		MvcResult mvcResult = mvc
				.perform(get("/api/tasks").with(httpBasic(testOrganisation.actingUser.getUsername(), "password")))
				.andReturn();
		PageResponse<Task> page = objectMapper.readValue(mvcResult.getResponse().getContentAsString(),
				objectMapper.getTypeFactory().constructParametricType(PageResponse.class, Task.class));

		int resultSize = 1;
		assertEquals(resultSize, page.getNumberOfElements());
		assertEquals(resultSize, page.getTotalElements());
		assertThat(page.getContent(), hasSize(resultSize));

		Task result = page.getContent().get(0);

		assertThat(result.getName(), equalTo(testOrganisation.taskAssignedToActingUser.getName()));
		assertThat(result.getNotes(), equalTo(testOrganisation.taskAssignedToActingUser.getNotes()));
		assertThat(result.getStatusId(), equalTo(testOrganisation.taskAssignedToActingUser.getStatusId()));
		assertThat(result.getUser().getId(), equalTo(testOrganisation.taskAssignedToActingUser.getUser().getId()));
	}
}
