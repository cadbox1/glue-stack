package com.api.task;

import com.api.BaseTest;
import com.api.PageResponse;
import com.api.domain.entity.Task;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.Assert.assertEquals;
import org.junit.Test;
import org.springframework.http.MediaType;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

public class FindAll extends BaseTest {

	@Test
	public void findAllUsersTest() throws Exception {
		MvcResult mvcResult = mvc.perform(get("/api/tasks")
				.contentType(MediaType.APPLICATION_JSON)
				.with(httpBasic(user.getUsername(),"password"))).andReturn();
		PageResponse<Task> page = objectMapper.readValue(
				mvcResult.getResponse().getContentAsString(),
				objectMapper.getTypeFactory().constructParametricType(PageResponse.class, Task.class));

		assertEquals(1, page.getNumberOfElements());
		assertEquals(1, page.getTotalElements());
		assertThat(page.getContent(), hasSize(1));

		Task result = page.getContent().get(0);

		assertThat(result.getName(), equalTo(task.getName()));
		assertThat(result.getNotes(), equalTo(task.getNotes()));
		assertThat(result.getStatusId(), equalTo(task.getStatusId()));
		assertThat(result.getUser().getId(), equalTo(task.getUser().getId()));
	}
}
