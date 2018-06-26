package org.gluestack.api.organisation;

import org.assertj.core.util.Arrays;
import org.gluestack.api.BaseTest;
import org.gluestack.api.domain.entity.Organisation;
import org.gluestack.api.domain.entity.User;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import java.util.ArrayList;
import java.util.List;

public class CreateTest extends BaseTest {

    @Test
    public void createTest() throws Exception {
        User user = new User();
        user.setFirstName("Create");
        user.setLastName("Test");
        user.setEmail("CreateTest");
        user.setPassword("CreateTest");

        Organisation organisation = new Organisation();
        organisation.setName("Create Test Organisation");
        List<User> users = new ArrayList<>();
        users.add(user);
        organisation.setUsers(users);

        mvc.perform(post("/api/organisations").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(organisation))).andReturn();

        mvc.perform(get("/api/authenticate").with(httpBasic(user.getUsername(), user.getPassword()))).andReturn();

    }

}