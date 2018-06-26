package org.gluestack.api.user;

import org.gluestack.api.BaseTest;
import org.gluestack.api.PageResponse;
import org.gluestack.api.domain.entity.Task;
import org.gluestack.api.domain.entity.User;

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
                .perform(get("/api/users").with(httpBasic(testOrganisation.actingUser.getUsername(), "password")))
                .andReturn();
        PageResponse<User> page = objectMapper.readValue(mvcResult.getResponse().getContentAsString(),
                objectMapper.getTypeFactory().constructParametricType(PageResponse.class, User.class));

        int resultSize = 2;
        assertEquals(resultSize, page.getNumberOfElements());
        assertEquals(resultSize, page.getTotalElements());
        assertThat(page.getContent(), hasSize(resultSize));

        User result = page.getContent().get(0);

        assertThat(result.getFirstName(), equalTo(testOrganisation.actingUser.getFirstName()));
        assertThat(result.getLastName(), equalTo(testOrganisation.actingUser.getLastName()));
        assertThat(result.getEmail(), equalTo(testOrganisation.actingUser.getEmail()));
    }
}
