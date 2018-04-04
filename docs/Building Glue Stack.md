# Building Glue Stack

1.  Make a development folder in your home folder. This is for all your development stuff.

    1.  Open terminal (Command+Space then type terminal - this is called spotlight)

    2.  It will open your home folder by default, you can tell by the tilde (~) which is the home folde symbol

        ```
        cd ~
        mkdir development
        cd development
        ```

2.  create a folder for our app

    ```
    mkdir glue-stack
    cd glue-stack
    ```

3.  Initialise the folder as a git repository. Git is a tool for version control - tracking code changes over time.

    ```
    git init
    ```

## Database

### Connect to MySQL

We're going to download MySQL and run it using a tool called Docker Compose which uses Docker then connect to it using Sequel Pro.

1.  Create a docker compose file

    1.  ```
        vim docker-compose.yml
        ```

    2.  Hit i to insert

    3.  Paste the following

        ```
        version: '3'
        services:
          database:
            image: mysql/mysql-server:5.7.21
            ports:
              - "3307:3306"
            environment:
              MYSQL_DATABASE: "glue"
              MYSQL_ALLOW_EMPTY_PASSWORD: "yes"
              MYSQL_ROOT_HOST: "%"
        ```

    4.  Finish inserting by hitting Esc

    5.  Save and quit using `:wq` (colon then w then q, not all at once)

    The standard port for MySQL is 3306 but i've chosen to map it to 3307 so it doesn't clash if you already have a MySQL database running - you can't have two applications listening to the same port.

2. Start the database

    ```
    docker-compose up
    ```

    The MySQL database will be open after the line`Starting MySQL 5.7.21-1.1.3`. To close it hit Control+C

3.  Commit your changes to git from terminal

    1.  Stage all your files (will just be our docker-compose file)

        ```
        git add -A
        ```

    2.  Commit

        ```
        git commit
        ```

        This will bring up a vim editor just like we did before. To write your commit message you use `i` to insert, write your commit message "added docker-compose file for database" above the commented (hashed) lines, then `esc`, then `:wq`. 

4. Download and install Sequel Pro from [https://www.sequelpro.com/](https://www.sequelpro.com/)

4.  Open Sequel Pro (possibly using spotlight)

5.  Connect to the MySQL database

    Name: localhost (localhost refers to your own computer)

    Host: 127.0.0.1 (the ip address of localhost - your computer)

    Username: root

    Password: (blank)

    Port: 3307

6.  Click test connection

    1.  If it succeeds click "Add to Favourites"

7.  Click "Connect"

8.  Select our "glue" database using the dropdown on the top left

### Create Tables

### Organisation Table

1.  Click the plus on the bottom left

    Name: organisation (its considered good practice to make sure table names aren't plurals; they're singular)

    Table Encoding: UTF-8 Unicode (utf8) (Unicode let's you store characters from all different languages)

    Table Collation: Default (utf8_general_ci)

2.  Click Add

3.  That should bring up the Structure tab where you can manage the Fields of the table

4.  Click the plus icon in the middle of the page underneath the lone id Field to add a new field

    Field: name

    Type: VARCHAR (a variable length text field)

    Length: 255

    Allow Null: false

5.  Add another Field

    Field: active

    Type: BIT

    Length: 1

    Allow Null: false

6.  Add another Field

    Field: createdDate

    Type: DATETIME

    Length: (leave blank)

    Allow Null: false

7.  Add another Field

    Field: modifiedDate

    Type: DATETIME

    Length: (leave blank)

    Allow Null: false

Cool you just created the organisation table! If you right click on the organisation table then go "Copy Create Table Syntax" it should look like this:

```
CREATE TABLE `organisation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `active` bit(1) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifedDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Alternatively, you can click the console button on the top right to see the SQL statements Sequel Pro has ran then you can filter for "create" and "alter table" statements. This is useful if you've modified an existing table.

### User Table

Each user belongs to a single organisation. We call this a Many-To-One relationship from a user to an organisation (or a One-To-Many relationship from an organisation to users). We model this relationship in relational databases using a foreign key. I like to think of relationships as associations as in a user is associated with an organisation and an organisation has users associated with it. The user table also has unique email addresses - no two users can have the same email.

1.  Click the plus on the bottom left again, name the table "user" with utf8 again.

2.  Add the organisation field

    The type of this column is going to match the type of the id of the organisation table. To keep things consistent all id columns are the same type.

    Field: organisationId

    Unsigned: true (this means we only want positive numbers)

    Type: INT

    Length: 11

    Allow Null: false

3.  Add a **foreign key**

    A foreign key is a relational database constraint that means a particular field must match another field. In this case we're making sure the organisationId references an existing organisation.

    1.  Click the Relations tab (for the user table)

    2.  Click the plus icon

        Name: (leave blank)

        Column: id

        References

        Table: organisation

        Column: id

    3.  Click Add

4.  Add another Field

    Field: email

    Type: VARCHAR

    Length: 255

    Allow Null: false

5.  Add a **unique index** to the email field

    This makes sure that two users can't have the same email address.

    1.  On the structure tab, click the plus at the very bottom of the indexes panel

        Key Type: Unique

        Field: Email

    2.  Click Add

6.  Add another Field

    Field: email

    Type: VARCHAR

    Length: 255

    Allow Null: false

7.  Add another Field

    Field: password

    Type: CHAR (the length of this field doesn't change)

    Length: 60 (the length of the password hashes - bcrypt hashes are always 60 characters)

    Allow Null: false

8.  Add another Field

    Field: firstName

    Type: VARCHAR

    Length: 255

    Allow Null: false

9.  Add another Field

    Field: lastName

    Type: VARCHAR

    Length: 255

    Allow Null: false

10. Let's add the active, createdDate, modifiedDate fields but since we did the same thing for the organisation table we can click the console icon, filter for "alter table" statements and copy the ones for those fields. Open up the query tab and paste them in there and modify them for the user table.


```
ALTER TABLE `user` ADD `active` BIT(1)  NOT NULL;
ALTER TABLE `user` ADD `createdDate` DATETIME  NOT NULL;
ALTER TABLE `user` ADD `modifiedDate` DATETIME  NOT NULL;
```

Highlight them all then hit Command+r to run them.

### Task Table

The task table has a Many-To-One relationship to an organisation (just like the user table) and a Many-To-One relationship to a user. That means a task can be associated with a user and a user can have tasks associated with them.

```
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
```

That's it! Have a play with the content tab on the tables to enter data if you're keen.

## API

### Get the API Running

1.  Install the Spring Boot CLI [source](http://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-installing-spring-boot.html#getting-started-homebrew-cli-installation)

    ```
    brew tap pivotal/tap
    brew install springboot
    ```

2.  Init a new spring boot project [source](https://docs.spring.io/spring-boot/docs/current/reference/html/cli-using-the-cli.html)

    ```
    spring init --dependencies=actuator,data-jpa,devtools,flyway,mysql,security,web --artifactId=api --groupId=org.gluestack --name=api api
    ```

    * Spring Actuator lets you access metrics about how the application is running
    * Spring Data JPA is a convenient way to access data
    * Spring Boot Development Tools gives us automatic reloads
    * Flyway keeps the database in sync with the application by managing SQL update scripts
    * MySQL is the Java driver for the MySQL database
    * Spring Security is for securing endpoints by requiring authentication
    * Web is for web applications and includes Tomcat and Spring MVC

    You can find a full list of possible dependencies by running

    ```
    spring init --list
    ```

3.  [Setup VSCode](https://github.com/cadbox1/glue-stack/blob/master/docs/Setup%20VSCode.md)

4.  Open the glue-stack folder

5.  Add some configuration to our project

    1.  Hit Command+p then start typing application.properties then open it.

        This is where we configure our Spring Boot application

    2.  Add the following:

        ```
        # database settings
        spring.datasource.url=jdbc:mysql://localhost:3307/glue
        spring.datasource.username=root
        spring.datasource.password=
        spring.datasource.driver-class-name=com.mysql.jdbc.Driver

        # this overrides the default spring boot convention for tables to have underscores
        spring.jpa.hibernate.naming.physical-strategy=org.hibernate.boot.model.naming.PhysicalNamingStrategyStandardImpl
        # this makes hibernate check that our Entities match our database
        spring.jpa.hibernate.ddl-auto=validate
        # fixes a weird issue I was having with validation. It prevents jpa from validating because I wanted to do it manually so I could autowire dependencies.
        spring.jpa.properties.javax.persistence.validation.mode=none
        # logs the SQL statements hibernate sends to the database
        spring.jpa.show-sql=true
        # turns off Flyway initially
        spring.flyway.enabled=false
        ```

    3.  Save using Command+s

6.  Hit Control+~ to bring up a terminal

7.  Run the app for the first time!

    ```
    cd api
    mvn spring-boot:run
    ```

    It should finish with `Started ApiApplication in x seconds`

    You don't have to remember the command every time because you can use Control+r to search for previous commands. So you can hit Control+r then type spring to search for commands containing spring. You can then use Control+r again to search further back or Control+s search forwards.

8.  Open Chrome and go to [http://localhost:8080/](http://localhost:8080/)

9. Notice how everything is secure by default

10. Commit your changes using the second menu item on the left. Just like before you can stage all or individual files and write a commit message saying "first running spring boot commit"

10. Configure Spring Security

11. Open `ApiApplication.java` (use Command+p)

12. In that folder create a folder called config. This will be a package in Java

13. Create a file in config called `WebSecurityConfiguration.java`

    ```
    package org.gluestack.api.config;

    import org.springframework.context.annotation.Configuration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

    @Configuration
    public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    	@Override
    	protected void configure(HttpSecurity http) throws Exception {
    		http.authorizeRequests().anyRequest().permitAll();
    	}
    }
    ```

    The @Configuration annotation means spring will use this to configure the application.

    This configures Spring Security to allow all request to all endpoints.

14. Save using Command+s

15. Go to [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) and it should say say "status: up"

    This is an Actuator endpoint.

### Add Database Scripts

1.  Create a file called `V1__create.sql` at `api/src/main/resources/db/migration` (you'll need to create a db and migration folder)

2.  Go back to Sequel Pro

3.  Right click the organisation tables, click "Copy Create Table Syntax" then paste it into the file

4.  Do the same for the user table then the task table.

    Its important to do it in this order because the task table depends on the user table which depends on the organisation table.

5.  Save using Command+s

6.  Delete the task table then the user table the organisation table.

    Again, the order is important because of the dependencies.

7.  Hit Control+c in the terminal where the API is running to stop it.

8.  Open up the `application.properties` file

9.  Remove the comment and replace the last line with

    ```
    spring.flyway.enabled=true
    ```

10. Save using Command+s

11. Start the API again by hitting the arrow keys up and down to find the command you previously used to start it

12. Go back to Sequel Pro and hit the refresh button on the bottom of the left pain to refresh the tables.

    You should see all your tables re-appaear plus a new table called `flyway_schema_history`. That table is what Flyway uses internally to check where your database is at so it can run scripts on startup so that everyone's databases is kept up to date.

13.  Commit your work saying "added database setup scripts".

### Create JPA (Hibernate) Entities

So we've now defined our database tables and their relationships to one another but we still need to create Java classes to represent that data so that we can use them effectively in our Java application. These Java classes are called Entities.

JPA (Java Persistence API) is a specification for Java ORM (Object Relational Mapping). A specification is like a Java interface where you define how you interact with the API without implementing it. ORM is all about mapping relational data in our database to Object Orientated data in our application so the data is more convenient to navigate. Some people really don't like ORM and I can definitely relate but I believe it's a useful concept to know. Hibernate is our JPA implementation that makes the JPA specification work and was around before JPA so that's why some sources will talk about hibernate without mentioning JPA.

Earlier, we identified some columns were the same in all the tables; id, active, createdDate, modifiedDate. We can also see that both the user and task table have an organisationId. Let me introduce you to the first programming concept in this tutorial; **DRY - don't repeat yourself**. This means try not to duplicate (copy and paste) code. Some people are pretty good at identifying common code in their head but i've always found it easiest to write duplicated code first so I can easily identify the common parts then `abstract` them. Abstraction means to reduce duplication.

I'm going to walk you through making the abstractions first becuase it makes this tutorial easier but I encourage you to write each of the classes in full then have a go abstracting second because I that's how I would develop outside this tutorial.

1.  Create a file called `BaseEntity.java` at `api/src/main/java/org/gluestack/api/domain/entity` (create the domain and entity folders (packages))

    ```
    package org.gluestack.api.domain.entity;

    import java.util.Date;
    import javax.persistence.Access;
    import javax.persistence.AccessType;
    import javax.persistence.Column;
    import javax.persistence.GeneratedValue;
    import javax.persistence.GenerationType;
    import javax.persistence.Id;
    import javax.persistence.MappedSuperclass;
    import javax.persistence.Temporal;
    import javax.persistence.TemporalType;
    import javax.validation.constraints.NotNull;
    import org.hibernate.annotations.CreationTimestamp;
    import org.hibernate.annotations.UpdateTimestamp;

    @MappedSuperclass
    public abstract class BaseEntity {

    	@Id
    	@Access(AccessType.PROPERTY)
    	@GeneratedValue(strategy = GenerationType.IDENTITY)
    	@Column(unique = true, nullable = false)
    	protected Integer id;

    	@NotNull
    	@Column(nullable = false)
    	protected Boolean active = true;

    	@CreationTimestamp
    	@Temporal(TemporalType.TIMESTAMP)
    	protected Date createdDate;

    	@UpdateTimestamp
    	@Temporal(TemporalType.TIMESTAMP)
    	protected Date modifiedDate;

    }
    ```

    Cool, what we've done is declare the id, active, createdDate and modifiedDate as `fields` and annotated them with some extra information for Hibernate. In Java the convention is to use getters and setters for each field instead of making them public so underneath the fields start writing set and get for each field and then you can use the autocomplete result. This is easier in other editors and I won't repeat this process for the rest of the tutorial.

    ```
    public Integer getId() {
    	return id;
    }

    public void setId(Integer id) {
    	this.id = id;
    }

    public Boolean getActive() {
    	return active;
    }

    public void setActive(Boolean active) {
    	this.active = active;
    }

    public Date getCreatedDate() {
    	return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
    	this.createdDate = createdDate;
    }

    public Date getModifiedDate() {
    	return modifiedDate;
    }

    public void setModifiedDate(Date modifiedDate) {
    	this.modifiedDate = modifiedDate;
    }
    ```

2.  Create a `BaseOrganisedEntity.java` in the same folder and generate the getter and setter for the organisation field. Don't generate the getter and setter for the superclass (BaseEntity) fields. Don't worry about compilation errors until after we've created all our entities because they all refer to each other.

    ```
    package org.gluestack.api.domain.entity;

    import javax.persistence.FetchType;
    import javax.persistence.JoinColumn;
    import javax.persistence.ManyToOne;
    import javax.persistence.MappedSuperclass;

    @MappedSuperclass
    public abstract class BaseOrganisedEntity extends BaseEntity {

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "organisationId", nullable = false)
        protected Organisation organisation;

    }
    ```

3.  Create `Organisation.java`

    ```
    package org.gluestack.api.domain.entity;

    import java.util.ArrayList;
    import java.util.List;
    import javax.persistence.Column;
    import javax.persistence.Entity;
    import javax.persistence.OneToMany;
    import javax.persistence.Table;
    import javax.validation.Valid;
    import org.hibernate.annotations.Cascade;
    import org.hibernate.annotations.CascadeType;

    @Entity
    @Table(name = "organisation")
    public class Organisation extends BaseEntity {

    	@Column(nullable = false, length = 255)
    	private String name;

    	@OneToMany(mappedBy = "organisation")
    	private List<Task> tasks = new ArrayList<>();

    	@Valid
    	@Cascade(CascadeType.ALL)
    	@OneToMany(mappedBy = "organisation")
    	private List<User> users = new ArrayList<>();

    	public Organisation() {
    	}

    }
    ```

4.  Create `User.java`. This one is a little bit more involved because it's the implementation for our user for Spring Security.

    ```
    package org.gluestack.api.domain.entity;

    import com.fasterxml.jackson.annotation.JsonProperty;
    import java.util.ArrayList;
    import java.util.Collection;
    import java.util.List;
    import javax.persistence.Column;
    import javax.persistence.Entity;
    import javax.persistence.OneToMany;
    import javax.persistence.Table;
    import javax.validation.constraints.NotBlank;
    import org.springframework.security.core.GrantedAuthority;
    import org.springframework.security.core.userdetails.UserDetails;

    @Entity
    @Table(name = "user")
    public class User extends BaseOrganisedEntity implements UserDetails {

        @NotBlank
        @Column(nullable = false, unique = true, length = 255)
        private String email;

        @NotBlank
        @Column(nullable = false, length = 255)
        private String firstName;

        @Column(nullable = false, length = 255)
        private String lastName;

        @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
        @NotBlank
        @Column(nullable = false, length = 60, columnDefinition = "CHAR(60)")
        private String password;

        @OneToMany(mappedBy = "user")
        private List<Task> tasks = new ArrayList<>();

        public User() {
        }

        public String getEmail() {
            return this.email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getFirstName() {
            return this.firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return this.lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        @Override
        public String getPassword() {
            return this.password;
        }

        public void setPassword(String password) {
            this.password = password;
        }

        public List<Task> getTasks() {
            return tasks;
        }

        public void setTasks(List<Task> tasks) {
            this.tasks = tasks;
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return null;
        }

        @Override
        public String getUsername() {
            return email;
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return active;
        }

    }
    ```

5.  Create `Task.java`

    ```
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

6. Start the application. Hibernate will validate that your data classes match your database and will fail to start if they don't.

    ```
    mvn spring-boot:run
    ```

7.  Commit your work; "created entities"

### Create the Repository Layer

The repository layer in Spring is a layer dedicated for communicating with data sources.

1. Add Querydsl JPA as a dependency. Querydsl JPA is a Java library for typesafe JPA queries that also works really well with another one of our cool libraries, Spring-Data-JPA, which is powering our repository layer.

    1.  Open the pom.xml file (using command + p) and add the following line to the properties element.

        ```
        <querydsl.version>4.2.1</querydsl.version>
        ```

    2.  Add the following dependency below Flyway

        ```
        <dependency>
            <groupId>com.querydsl</groupId>
            <artifactId>querydsl-jpa</artifactId>
            <version>${querydsl.version}</version>
        </dependency>
        ```

    3.  Add the following plugin to the plugins element below the spring-boot-maven-plugin.

        ```
        <plugin>
            <groupId>com.mysema.maven</groupId>
            <artifactId>apt-maven-plugin</artifactId>
            <version>1.1.3</version>
            <executions>
                <execution>
                    <goals>
                        <goal>process</goal>
                    </goals>
                    <configuration>
                        <outputDirectory>target/generated-sources/java</outputDirectory>
                        <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
                    </configuration>
                </execution>
            </executions>
            <dependencies>
                <dependency>
                    <groupId>com.querydsl</groupId>
                    <artifactId>querydsl-apt</artifactId>
                    <version>${querydsl.version}</version>
                </dependency>
            </dependencies>
        </plugin>
        ```

2.  Create the `BaseRepository.java` file at `api/src/main/java/org/gluestack/api/repository`.

    ```
    package org.gluestack.api.repository;

    import java.io.Serializable;
    import org.springframework.data.querydsl.QuerydslPredicateExecutor;
    import org.springframework.data.repository.CrudRepository;
    import org.springframework.data.repository.NoRepositoryBean;

    @NoRepositoryBean
    public interface BaseRepository<T, ID extends Serializable>
                    extends CrudRepository<T, ID>, QuerydslPredicateExecutor<T> {

    }
    ```

3.  Create the `OrganisationRepository.java`

    ```
    package org.gluestack.api.repository;

    import org.gluestack.api.domain.entity.Organisation;

    public interface OrganisationRepository extends BaseRepository<Organisation, Integer> {
    }
    ```

    ​

4.  Create the `UserRepository.java`. The findOneByEmail method will allow us to find a User in the database by their email and the EntityGraph annotation will load their Organisation in the same query. This will be useful for authentication. This is where Spring Data JPA is pretty cool, its an interface that automagically implements itself!

    ```
    package org.gluestack.api.repository;

    import org.gluestack.api.domain.entity.User;
    import org.springframework.data.jpa.repository.EntityGraph;

    public interface UserRepository extends BaseRepository<User, Integer> {

    	@EntityGraph(attributePaths = { "organisation" })
    	User findOneByEmail(String email);
    }
    ```

5.  Create the `TaskRepository.java`

    ```
    package org.gluestack.api.repository;

    import org.gluestack.api.domain.entity.Task;

    public interface TaskRepository extends BaseRepository<Task, Integer> {
    }
    ```

6. Restart the application to make sure its all correct.

7. Commit your work; "created repository layer"

### Create the Service Layer

The service layer is where most of your API logic lives. Some people choose to split up the service layer further where they see fit but I prefer Services call other Services as required instead of creating mandatory layers.

1. Create the `Permission.java` Enum at `api/src/main/java/org/gluestack/api/domain/other`

   ```
   package org.gluestack.api.domain.other;

   public enum Permission {
       READ, WRITE, EXECUTE,
   }
   ```

   ​

2. Create the `BaseService.java` file at `api/src/main/java/org/gluestack/api/service`. This is up there with the most custom code in this entire project so you can just grab the source from the code repo. [https://github.com/cadbox1/glue-stack/blob/master/api/src/main/java/com/api/service/BaseService.java](https://github.com/cadbox1/glue-stack/blob/master/api/src/main/java/com/api/service/BaseService.java)

3. ​