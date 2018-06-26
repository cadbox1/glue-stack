package org.gluestack.api;

import org.gluestack.api.domain.entity.Organisation;
import org.gluestack.api.domain.entity.Task;
import org.gluestack.api.domain.entity.User;
import org.gluestack.api.repository.OrganisationRepository;
import org.gluestack.api.repository.TaskRepository;
import org.gluestack.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class TestOrganisationService {

    @Autowired
    private OrganisationRepository organisationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public TestOrganisation createTestOrganisiation() {
        TestOrganisation testOrganisation = new TestOrganisation();

        Organisation organisation = new Organisation();
        organisation.setName("organisation");
        organisationRepository.save(organisation);
        testOrganisation.organisation = organisation;

        User actingUser = new User();
        actingUser.setEmail(organisation.getId() + "actingUser");
        actingUser.setPassword(passwordEncoder.encode("password"));
        actingUser.setFirstName("Acting");
        actingUser.setLastName("User");
        actingUser.setOrganisation(organisation);
        userRepository.save(actingUser);
        testOrganisation.actingUser = actingUser;

        User otherUser = new User();
        otherUser.setEmail(organisation.getId() + "otherUser");
        otherUser.setPassword(passwordEncoder.encode("password"));
        otherUser.setFirstName("Other");
        otherUser.setLastName("User");
        otherUser.setOrganisation(organisation);
        userRepository.save(otherUser);
        testOrganisation.otherUser = otherUser;

        Task taskAssignedToActingUser = new Task();
        taskAssignedToActingUser.setName("Assigned Task");
        taskAssignedToActingUser.setNotes("Assigned To Acting User");
        taskAssignedToActingUser.setStatusId(1);
        taskAssignedToActingUser.setUser(actingUser);
        taskAssignedToActingUser.setOrganisation(organisation);
        taskRepository.save(taskAssignedToActingUser);
        testOrganisation.taskAssignedToActingUser = taskAssignedToActingUser;

        return testOrganisation;
    }
}