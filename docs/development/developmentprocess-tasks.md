# Development Process - Tasks

This is the document I believe more teams need to write. How to develop a 'trivial' CRUD screen, in this case its the tasks part of our task management app.

This is a demonstration of the process documentation I describe [here](developingprocessdocumentation.md).

In this document we will be building the entire tasks domain of our app, from database to Java API to React UI to Pull Request and finally Deployment.

I've focused on getting the steps right for now but will be expanding on what we are actually doing in each step in the future.

## Prerequisites

[Setup Development Tools](https://github.com/cadbox1/glue-stack/tree/dd43c5a0153924fa2c1bc96fab13b0d99a7a52d9/docs/Development/SetupDevelopmentTools.md).

## Design

Process determines design because it will create a lot of the constraints the design needs to address. I'll work on this in the future when our process has stabilised.

## Development

1. Checkout our specially made branch without any tasks.

   ```text
   git checkout no-tasks-do-not-merge
   ```

2. Open glue-stack in VSCode.
3. Open the terminal using \(Control + \`\).
4. Follow the steps at [Running locally](runninglocally.md), using the plus button in VSCode's terminal to create a new tab.
5. Take a look at the app without any tasks.

### Database

1. Open Glue Stack in VSCode.
2. Start the database by opening a terminal \(Control + \`\) and running:

   ```text
   docker-compose up
   ```

#### Task Table

The task table has a Many-To-One relationship to an organisation \(just like the user table\) and a Many-To-One relationship to a user. That means a task can be associated with a user and a user can have tasks associated with them.

1. Open sequel pro.
2. Connect to the docker database.
3. Click the plus on the bottom left. Name the table `task` with utf8mb4 encoding.
4. Add the organisation field.

   The type of this column is going to match the type of the id of the organisation table. To keep things consistent all id columns are the same type.

   ```text
    Field: organisationId
    Unsigned: true
    Type: INT
    Length: 11
    Allow Null: false
   ```

5. Add a **foreign key**.

   A foreign key is a relational database constraint that means a particular field must match another field. In this case we're making sure the organisationId references an existing organisation.

   1. Click the Relations tab.
   2. Click the plus icon.

      ```text
       Name: (leave blank)
       Column: organisationId
       References
       Table: organisation
       Column: id
      ```

   3. Click Add.

6. Click on the Structure tab again.
7. Click the plus icon in the middle of the page underneath the lone id Field to add a new field.

   ```text
    Field: name
    Type: VARCHAR
    Length: 255
    Allow Null: false
   ```

8. Add another Field.

   ```text
    Field: notes
    Type: VARCHAR
    Length: 255
    Allow Null: true
   ```

9. Add another Field.

   ```text
    Field: userId
    Unsigned: true
    Type: INT
    Length: 11
    Allow Null: true
   ```

10. Add a foreign key constraint to the user table for the previous field.
11. Add another Field.

    ```text
     Field: statusId
     Unsigned: true
     Type: INT
     Length: 11
     Allow Null: false
    ```

12. Add the standard acive, createdDate, modifiedDate fields by running the following queries in the query tab.

    ```text
    ALTER TABLE `task` ADD `active` BIT(1)  NOT NULL;
    ALTER TABLE `task` ADD `createdDate` DATETIME  NOT NULL;
    ALTER TABLE `task` ADD `modifiedDate` DATETIME  NOT NULL;
    ```

13. We've just created our new table so all we need to do now is add it to the codebase. If we added a few fields we could use the statement console \(top right\) and copy the relevant statements but this time we created a whole table so we can right click the table and select `Copy Create Table Syntax`.
14. Go back to VSCode.
15. Create a `V2__task.sql` at ```api/src/main/resources/db/migration``.
16. Paste your Create Table Syntax into the file. It should look like this:

    ```text
    CREATE TABLE `task` (
      `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
      `organisationId` int(11) unsigned NOT NULL,
      `name` varchar(255) NOT NULL DEFAULT '',
      `notes` varchar(255) DEFAULT NULL,
      `userId` int(11) unsigned DEFAULT NULL,
      `statusId` int(11) unsigned DEFAULT NULL,
      `active` bit(1) NOT NULL,
      `createdDate` datetime NOT NULL,
      `modifiedDate` datetime DEFAULT NULL,
      PRIMARY KEY (`id`),
      KEY `organisationId` (`organisationId`),
      KEY `userId` (`userId`),
      CONSTRAINT `task_ibfk_1` FOREIGN KEY (`organisationId`) REFERENCES `organisation` (`id`),
      CONSTRAINT `task_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
    ```

17. Commit your work.
18. Delete all your tables by selecting them and forcing deletion. This will let Flyway set them up from scratch using the scripts in the migration folder including your new scripts. \(TODO: is there a better way?\)
19. Open a new terminal tab.
20. Run the server.

    ```text
    cd api
    mvn spring-boot:run
    ```

### API

#### Entity

1. Create `Task.java` at ```api/src/main/java/org/gluestack/api/domain/entity``.

   ```text
   package org.gluestack.api.domain.entity;

   import javax.persistence.Column;
   import javax.persistence.Entity;
   import javax.persistence.FetchType;
   import javax.persistence.JoinColumn;
   import javax.persistence.ManyToOne;
   import javax.persistence.Table;

   @Entity
   @Table(name = "task")
   public class Task extends BaseOrganisedEntity {

       @Column(nullable = false, length = 255)
       private String name;

       @Column(length = 255)
       private String notes;

       @ManyToOne(fetch = FetchType.LAZY)
       @JoinColumn(name = "userId")
       private User user;

       @Column(nullable = false)
       private Integer statusId;

       public Task() {
       }
   }
   ```

2. Create the getters and setters.
3. Stop the API using `Control + c` in its terminal window.
4. Start it again \(using the up arrow to find the previously run command\). This will validate that the entity we created matches the table in the database.
5. Commit your work.

#### Repository

1. Create the `TaskRepository.java` at ```api/src/main/java/org/gluestack/api/repository``.

   ```text
    package org.gluestack.api.repository;

    import org.gluestack.api.domain.entity.Task;

    public interface TaskRepository extends BaseRepository<Task> {
    }
   ```

2. Commit your work.

#### Service

1. Create the `TaskService.java` at ```api/src/main/java/org/gluestack/api/service``.

   In this case the TaskService wants to return related entities to the user \(the user details of the assigned user\) so we use hibernate to load those details and the `jackson-datatype-hibernate5` module will automatically serialise it \(convert to JSON\).

   ```text
   package org.gluestack.api.service;

   import org.gluestack.api.domain.entity.QTask;
   import org.gluestack.api.domain.entity.Task;
   import org.gluestack.api.domain.entity.User;
   import com.querydsl.core.types.Predicate;
   import org.hibernate.Hibernate;
   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.Pageable;
   import org.springframework.stereotype.Service;

   @Service
   public class TaskService extends BaseService<Task> {

       @Override
       public Predicate getReadPermissionPredicate(User principalUser) {
           return QTask.task.organisation.id.eq(principalUser.getOrganisation().getId());
       }

       @Override
       public Page<Task> findAll(User principalUser, Predicate predicate, Pageable pageRequest) {
           Page<Task> tasks = super.findAll(principalUser, predicate, pageRequest);
           tasks.getContent().forEach(task -> Hibernate.initialize(task.getUser()));
           return tasks;
       }
   }
   ```

2. Commit your work.

#### Controller

1. Create the `TaskController.java` at ```api/src/main/java/org/gluestack/api/controller``.

   ```text
   package org.gluestack.api.controller;

   import org.gluestack.api.domain.entity.Task;
   import org.gluestack.api.domain.entity.User;
   import org.gluestack.api.service.TaskService;
   import com.querydsl.core.types.Predicate;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.data.domain.Page;
   import org.springframework.data.domain.Pageable;
   import org.springframework.data.querydsl.binding.QuerydslPredicate;
   import org.springframework.security.core.Authentication;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;
   import org.springframework.web.bind.annotation.RestController;

   @RestController
   @RequestMapping("api/tasks")
   public class TaskController extends BaseController<Task> {

       @Autowired
       private TaskService taskService;

       @RequestMapping(method = RequestMethod.GET)
       public Page<Task> findAll(Authentication authentication, @QuerydslPredicate Predicate predicate,
               Pageable pageRequest) {
           User principalUser = (User) authentication.getPrincipal();
           return taskService.findAll(principalUser, predicate, pageRequest);
       }

   }
   ```

2. Commit your work.

#### Tests

Our current test framework means you make it easy to reuse the test data you use in your tests so there is lest time wasted setting up the same data scenarios over and over again.

1. Open `TestOrganisation.java`.
2. Add a Task field called `taskAssignedToActingUser`.
3. Open `TestOrganisationService.java` and populate that test Task at the end of the create method.

   ```text
   Task taskAssignedToActingUser = new Task();
   taskAssignedToActingUser.setName("Assigned Task");
   taskAssignedToActingUser.setNotes("Assigned To Acting User");
   taskAssignedToActingUser.setStatusId(1);
   taskAssignedToActingUser.setUser(actingUser);
   taskAssignedToActingUser.setOrganisation(organisation);
   taskRepository.save(taskAssignedToActingUser);
   testOrganisation.taskAssignedToActingUser = taskAssignedToActingUser;
   ```

4. Create `FindAllTest.java` at `api/src/test/java/org/gluestack/api/task`.

   ```text
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
   ```

5. Run `mvn test` to make sure its all working!
6. Commit your work.

### UI

[JavaScript fundamentals before learning React](https://news.ycombinator.com/item?id=17569848) is a good resource to understand Javascript while learning React.

1. Create a task folder at `ui/src/main/authenticated/task`.
2. Create the `index.js` file inside that folder. This will be the root task page.

   ```text
   import React, { Component } from 'react';

   class Task extends Component {
       render() {
           return (
               <div>tasks</div>
           );
       }
   }

   export { Task};
   ```

3. Save.
4. Open `authenticated/index.js` \(Using `Command+p` then typing `auth/ind`\).
5. Add the following below the "users" Route in the render function.

   ```text
   <Route
       path="/tasks"
       render={props => (
           <Task
               {...props}
               {...this.props}
               toggleSideBar={this.toggleSideBar}
           />
       )}
   />
   ```

6. Put your cursor at the end of the word `<Task`, hit `Control + Space` and select the Task that says auto import \(mine was the second option\). It should add the following to the top of the file.

   ```text
   import { Task } from "./task";
   ```

7. Save.
8. Open `sidebar/index.js` using the same hotkey and technique as before.
9. Add the following below the "users" `<ListItem` in the render function.

   ```text
   <ListItem component={Link} to="/tasks" button>
       <ListItemText primary="Tasks" />
   </ListItem>
   ```

10. Save
11. You should now be able to click the Tasks item in the side bottom and it should render a page saying "tasks".
12. Create the `task.js` file at `ui/src/api/`.

    ```text
    import axios from "axios";

    const path = "tasks";

    export function findAll({ name, userId, statusId, page, size, sort } = {}) {
        return axios.get(path, {
            params: { name, "user.id": userId, statusId, page, size, sort },
        });
    }

    export function findOne(id) {
        return axios.get(`${path}/${id}`);
    }

    export function patch(id, body) {
        return axios.patch(`${path}/${id}`, body);
    }

    export function save(body) {
        if (body.id) {
            return patch(body.id, body);
        } else {
            return axios.post(path, body);
        }
    }

    export const TaskStatus = {
        TODO: 0,
        IN_PROGRESS: 1,
        DONE: 2,
    };
    ```

13. Create the list component. Create a new file in the`ui/src/main/authenticated/task/` folder called `list.js`.

    ```text
    import React, { Component } from "react";
    import Table from "@material-ui/core/Table";
    import TableBody from "@material-ui/core/TableBody";
    import TableHead from "@material-ui/core/TableHead";
    import TableRow from "@material-ui/core/TableRow";
    import TableFooter from "@material-ui/core/TableFooter";
    import Hidden from "@material-ui/core/Hidden";
    import { TableCell } from "common/components/TableCell";
    import { parseURL } from "common/parseURL";
    import { TablePagination } from "common/components/TablePagination";
    import { TableSortLabel } from "common/components/TableSortLabel";
    import { findAll } from "api/task";

    class List extends Component {
        render() {
            const { findAll } = this.props;
            return (
                <div style={{ width: "100%", overflow: "auto" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel findAll={findAll} property="name">
                                        Name
                                    </TableSortLabel>
                                </TableCell>
                                <Hidden smDown>
                                    <TableCell>
                                        <TableSortLabel findAll={findAll} property="notes">
                                            Notes
                                        </TableSortLabel>
                                    </TableCell>
                                </Hidden>
                                <TableCell>
                                    <TableSortLabel findAll={findAll} property="statusId">
                                        Status
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel findAll={findAll} property="user.firstName">
                                        Assigned
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {findAll.rejected && (
                                <TableRow>
                                    <TableCell colSpan="3">
                                        {findAll.reason ? (
                                            <div>
                                                <p>{findAll.reason.error}</p>
                                                <p>{findAll.reason.exception}</p>
                                                <p>{findAll.reason.message}</p>
                                            </div>
                                        ) : (
                                            <p>Error</p>
                                        )}
                                    </TableCell>
                                </TableRow>
                            )}
                            {findAll.value &&
                                findAll.value.data.content.map(row => <div>{row.id}</div>)}
                        </TableBody>
                        {findAll.fulfilled && (
                            <TableFooter>
                                <TableRow>
                                    <TablePagination findAll={findAll} />
                                </TableRow>
                            </TableFooter>
                        )}
                    </Table>
                </div>
            );
        }
    }

    export { List };

    export const connectConfig = {
        findAll: {
            params: props => {
                const { search, statusId, userId } = props.params;
                return {
                    ...parseURL(props),
                    name: search,
                    statusId: statusId != null ? Number(statusId) : statusId,
                    userId: userId != null ? Number(userId) : userId,
                };
            },
            promise: findAll,
        },
    };
    ```

14. Change the `index.js` to this:

    ```text
    import React, { Component, Fragment } from "react";
    import { Route } from "react-router-dom";
    import componentQueries from "react-component-queries";
    import { withStyles } from "@material-ui/core/styles";
    import IconButton from "@material-ui/core/IconButton";
    import Add from "@material-ui/icons/Add";
    import { Container } from "common/components/Container";
    import { Page } from "common/components/Page";
    import { AppBar } from "common/components/AppBar";
    import { MenuButton } from "common/components/MenuButton";
    import { AppBarTitle } from "common/components/AppBarTitle";
    import { RefreshButton } from "common/components/RefreshButton";
    import { Link } from "common/components/Link";
    import { connect } from "common/connector";
    import { urlStateHolder } from "common/stateHolder";
    import { List, connectConfig } from "./list";

    const styles = theme => ({
        inputRoot: {
            color: "inherit",
        },
    });

    class Task extends Component {
        render() {
            const { match, findAll, toggleSideBar, singleView } = this.props;

            return (
                <Container>
                    <Route
                        path={`${match.path}`}
                        exact={singleView}
                        render={props => (
                            <Page>
                                <AppBar>
                                    <Fragment>
                                        <MenuButton toggleSideBar={toggleSideBar} />
                                        <AppBarTitle>Tasks</AppBarTitle>

                                        <RefreshButton findAll={findAll} />
                                        <IconButton
                                            component={Link}
                                            to={`${match.path}/create`}
                                            color="inherit"
                                        >
                                            <Add />
                                        </IconButton>
                                    </Fragment>
                                </AppBar>
                                <List {...props} listURL={match.path} findAll={findAll} />
                            </Page>
                        )}
                    />
                </Container>
            );
        }
    }

    Task = withStyles(styles)(
        componentQueries({
            queries: [
                ({ width }) => ({
                    singleView: width < 1000,
                }),
            ],
            config: { pure: false },
        })(urlStateHolder(connect(connectConfig)(Task)))
    );

    export { Task };
    ```

15. The tasks page should now be starting to look more like the users page.
16. Next we will work on Adding a task.

