# Making Glue Stack

This covers how to create an application that manages users from a blank folder. It won't be kept quite as up to date as the [Development Process Document](./DevelopmentProcess-Tasks.md) because its a lot longer. It was interesting to go through and rewrite the application I just wrote and clarify some of the stranger parts. I think it would be really cool to show new team members how to build the core framework of the existing application from scratch but you can judge how useful it is. 

1. Create a file to write down any questions you have or anything that's unclear in this document so that we can improve it to make it easier for the next person.

2. Run the `setup.sh` as part of the [Running Locally](./README.md#running-locally) process. This will install some of the tools we're going to need.

3. Make a development folder in your home folder. This is for all your development stuff.

   1. Open terminal. `Command + Space` \(Spotlight\) then type terminal.
   2. It will open your home folder by default, indicated by the `~` (tilde).

      ```text
      cd ~
      mkdir development
      cd development
      ```

4. Create a folder for our app.

   ```text
    mkdir glue-stack
    cd glue-stack
   ```

5. Initialise the folder as a git repository. Git is a tool for `version control` which tracks changes to files.

   ```text
    git init
   ```

## Database

### Connect to MySQL

We're going to download MySQL and run it using a tool called Docker Compose which uses Docker then connect to it using Sequel Pro.

1. Create a docker compose file.

   1. Use vim to create a `docker-compose.yml` file.
   
      ```text
      vim docker-compose.yml
      ```
      
   2. Hit `i` to insert text.
   3. Paste the following:

      ```text
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

   4. Finish inserting by hitting `Esc`.
   5. Save and quit using `:wq` \(colon then w then q, not all at once\).

      The standard port for MySQL is 3306 but I've chosen to map it to 3307 so it doesn't clash if you already have a MySQL database running - you can't have two applications listening to the same port.
   
2. Start the database.

   ```text
    docker-compose up
   ```

   The MySQL database will be open after the line`Starting MySQL 5.7.21-1.1.3`. To close it hit `Control + C`.

3. Commit your changes to git from terminal.

   1. Stage all your files \(will just be our docker-compose file\).

      ```text
      git add -A
      ```

   2. Commit.

      ```text
      git commit
      ```

      This will bring up a vim editor just like we did before. To write your commit message you use `i` to insert, write your commit message "added docker-compose file for database" above the commented \(hashed\) lines, then `esc`, then `:wq`.
4. Download and install Sequel Pro from [https://www.sequelpro.com/](https://www.sequelpro.com/).
5. Open Sequel Pro \(possibly using spotlight\).
6. Connect to the MySQL database.

   ```text
    Name: localhost (localhost refers to your own computer)
    Host: 127.0.0.1 (the ip address of localhost - your computer)
    Username: root
    Password: (blank)
    Port: 3307
   ```

7. Click test connection.
8. If it succeeds click "Add to Favourites".
9. Click "Connect".
10. Select our "glue" database using the dropdown on the top left.

### Create Tables

### Organisation Table

1. Click the plus on the bottom left.

   Name: organisation \(its considered good practice to make sure table names aren't plurals; they're singular\)

   Table Encoding: UTF-8 Unicode \(utf8mb4\) \(Unicode let's you store characters from all different languages\)

   Table Collation: Default \(utf8mb4\_general\_ci\)

2. Click Add.
3. That should bring up the Structure tab where you can manage the Fields of the table.
4. Click the plus icon in the middle of the page underneath the lone id Field to add a new field.

   ```text
    Field: name
    Type: VARCHAR (a variable length text field)
    Length: 255
    Allow Null: false
   ```

5. Add another Field.

   ```text
    Field: active
    Type: BIT
    Length: 1
    Allow Null: false
   ```

6. Add another Field.

   ```text
    Field: createdDate
    Type: DATETIME
    Length: (leave blank)
    Allow Null: false
   ```

7. Add another Field.

   ```text
    Field: modifiedDate
    Type: DATETIME
    Length: (leave blank)
    Allow Null: false
   ```

Cool you just created the organisation table! If you right click on the organisation table then go "Copy Create Table Syntax" it should look like this:

```text
CREATE TABLE `organisation` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `active` bit(1) NOT NULL,
  `createdDate` datetime NOT NULL,
  `modifedDate` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

Alternatively, you can click the console button on the top right to see the SQL statements Sequel Pro has ran then you can filter for "create" and "alter table" statements. This is useful if you've modified an existing table.

### User Table

Each user belongs to a single organisation. We call this a Many-To-One relationship from a user to an organisation \(or a One-To-Many relationship from an organisation to users\). We model this relationship in relational databases using a foreign key. I like to think of relationships as associations as in a user is associated with an organisation and an organisation has users associated with it. The user table also has unique email addresses - no two users can have the same email.

1. Click the plus on the bottom left again, name the table `task` with utf8mb4 again.
2. Add the organisation field.

   The type of this column is going to match the type of the id of the organisation table. To keep things consistent all id columns are the same type.

   ```text
    Field: organisationId
    Unsigned: true (this means we only want positive numbers)
    Type: INT
    Length: 11
    Allow Null: false
   ```

3. Add a **foreign key**.

   A foreign key is a relational database constraint that means a particular field must match another field. In this case we're making sure the organisationId references an existing organisation.

   1. Click the Relations tab \(for the user table\).
   2. Click the plus icon.

      ```text
       Name: (leave blank)
       Column: organisationId
       References
       Table: organisation
       Column: id
      ```

   3. Click Add.

4. Add another Field.

   ```text
    Field: email
    Type: VARCHAR
    Length: 255
    Allow Null: false
   ```

5. Add a **unique index** to the email field.

   This makes sure that two users can't have the same email address.

   1. On the structure tab, click the plus at the very bottom of the indexes panel.

      ```text
      Key Type: Unique
      Field: Email
      ```

   2. Click Add.

6. Add another Field.

   ```text
    Field: email
    Type: VARCHAR
    Length: 255
    Allow Null: false
   ```

7. Add another Field.

   ```text
    Field: password
    Type: CHAR (the length of this field doesn't change)
    Length: 60 (the length of the password hashes - bcrypt hashes are always 60 characters)
    Allow Null: false
   ```

8. Add another Field.

   ```text
    Field: firstName
    Type: VARCHAR
    Length: 255
    Allow Null: false
   ```

9. Add another Field.

   ```text
    Field: lastName
    Type: VARCHAR
    Length: 255
    Allow Null: false
   ```

10. Let's add the active, createdDate, modifiedDate fields but since we did the same thing for the organisation table we can click the console icon, filter for "alter table" statements and copy the ones for those fields. Open up the query tab and paste them in there and modify them for the user table.

```text
ALTER TABLE `user` ADD `active` BIT(1)  NOT NULL;
ALTER TABLE `user` ADD `createdDate` DATETIME  NOT NULL;
ALTER TABLE `user` ADD `modifiedDate` DATETIME  NOT NULL;
```

Highlight them all then hit Command+r to run them.

That's it! Have a play with the content tab on the tables to enter data if you're keen.

## API

### Get the API Running

1. Install the Spring Boot CLI [source](http://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-installing-spring-boot.html#getting-started-homebrew-cli-installation).

   ```text
   brew tap pivotal/tap
   brew install springboot
   ```

2. Init a new spring boot project [source](https://docs.spring.io/spring-boot/docs/current/reference/html/cli-using-the-cli.html).

   ```text
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

   ```text
   spring init --list
   ```

3. [Setup VSCode](https://github.com/cadbox1/glue-stack/tree/36ae8a12738e97168e5c6552be7b4538c2bcd25a/docs/Setup%20VSCode.md).
4. Open the glue-stack folder.
5. Add some configuration to our project.

   1. Hit Command+p then start typing `application.properties` then open it.

      This is where we configure our Spring Boot application.

   2. Add the following:

      ```text
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

   3. Save using `Command + s`.
   
6. Hit `Control + ~` to bring up a terminal.
7. Run the app for the first time!

   ```text
   cd api
   mvn spring-boot:run
   ```

   It should finish with `Started ApiApplication in x seconds`.

   You don't have to remember the command every time because you can use Control+r to search for previous commands. So you can hit Control+r then type spring to search for commands containing spring. You can then use Control+r again to search further back or Control+s search forwards.

8. Open Chrome and go to [http://localhost:8080/](http://localhost:8080/).
9. Notice how everything is secure by default.
10. Commit your changes using the second menu item on the left. Just like before you can stage all or individual files and write a commit message saying "first running spring boot commit".
11. Configure Spring Security.
12. Open `ApiApplication.java` \(use Command+p\).
13. In that folder create a folder called config. This will be a package in Java.
14. Create a file in config called `WebSecurityConfiguration.java`.

    ```text
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

15. Save using `Command + s`.
16. Go to [http://localhost:8080/actuator/health](http://localhost:8080/actuator/health) and it should say say "status: up".

    This is an Actuator endpoint.

### Add Database Scripts

1. Create a file called `V1__create.sql` at `api/src/main/resources/db/migration` \(you'll need to create a db and migration folder\).
2. Go back to Sequel Pro.
3. Right click the organisation tables, click "Copy Create Table Syntax" then paste it into the file.
4. Do the same for the user table then the task table.

   Its important to do it in this order because the task table depends on the user table which depends on the organisation table.

5. Save using `Command + s`.
6. Delete the task table then the user table the organisation table.

   Again, the order is important because of the dependencies.

7. Hit Control+c in the terminal where the API is running to stop it.
8. Open up the `application.properties` file.
9. Remove the comment and replace the last line with.

   ```text
   spring.flyway.enabled=true
   ```

10. Save using `Command + s`.
11. Start the API again by hitting the arrow keys up and down to find the command you previously used to start it.
12. Go back to Sequel Pro and hit the refresh button on the bottom of the left pain to refresh the tables.

    You should see all your tables re-appaear plus a new table called `flyway_schema_history`. That table is what Flyway uses internally to check where your database is at so it can run scripts on startup so that everyone's databases is kept up to date.

13. Commit your work saying "added database setup scripts".

### Create JPA \(Hibernate\) Entities

So we've now defined our database tables and their relationships to one another but we still need to create Java classes to represent that data so that we can use them effectively in our Java application. These Java classes are called Entities.

JPA \(Java Persistence API\) is a specification for Java ORM \(Object Relational Mapping\). A specification is like a Java interface where you define how you interact with the API without implementing it. ORM is all about mapping relational data in our database to Object Orientated data in our application so the data is more convenient to navigate. Some people really don't like ORM and I can definitely relate but I believe it's a useful concept to know. Hibernate is our JPA implementation that makes the JPA specification work and was around before JPA so that's why some sources will talk about hibernate without mentioning JPA.

Earlier, we identified some columns were the same in all the tables; id, active, createdDate, modifiedDate. We can also see that both the user and task table have an organisationId. Let me introduce you to the first programming concept in this tutorial; **DRY - don't repeat yourself**. This means try not to duplicate \(copy and paste\) code. Some people are pretty good at identifying common code in their head but i've always found it easiest to write duplicated code first so I can easily identify the common parts then `abstract` them. Abstraction means to reduce duplication.

I'm going to walk you through making the abstractions first becuase it makes this tutorial easier but I encourage you to write each of the classes in full then have a go abstracting second because I that's how I would develop outside this tutorial.

1. Create a file called `BaseEntity.java` at `api/src/main/java/org/gluestack/api/domain/entity` \(create the domain and entity folders \(packages\)\).

   ```text
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

   ```text
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

2. Create a `BaseOrganisedEntity.java` in the same folder and generate the getter and setter for the organisation field. Don't generate the getter and setter for the superclass \(BaseEntity\) fields. Don't worry about compilation errors until after we've created all our entities because they all refer to each other.

   ```text
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

3. Create `Organisation.java`. This is largely what you would call a `POJO` in Java - Plain Old Java Object. A `POJO` is Java class that just has fields and getters and setters. We've added some annotations but I still largely consider this a `POJO`.

   ```text
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

4. Create `User.java`. This one is a little bit more involved because it's the implementation for our user for Spring Security.

   ```text
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

5. Start the application. Hibernate will validate that your data classes match your database and will fail to start if they don't.

   ```text
    mvn spring-boot:run
   ```

6. Commit your work; "created entities".

### Create the Repository Layer

The repository layer in Spring is a layer dedicated for communicating with data sources.

To do this, we'll need to add some `dependencies` to our project. Dependencies are dependencies on `libraries`. A Library is a separate, reusable piece of code that does something and makes your life easier and associated with the concept of `abstraction` which means to reduce complexity. A lot of people write Java Web Applications so its only natural that we deal with the same problems so libraries are an attempt to solve some of those common problems. In Java you used to have to download a compiled library but this is hard to maintain and leads to large project sizes so we use what's called dependency management where you simply specify the library and the version that you want and that will be used to download that library for you. In Java you can use Maven to manage dependencies and it stores the version information in a `pom.xml` file.

1. Add Querydsl JPA as a dependency. Querydsl JPA is a Java library for typesafe JPA queries that also works really well with another one of our cool libraries, Spring-Data-JPA, which is powering our repository layer.

   1. Open the pom.xml file \(using command + p\) and add the following line to the properties element.

      ```text
      <querydsl.version>4.2.1</querydsl.version>
      ```

   2. Add the following dependency below Flyway.

      ```text
      <dependency>
          <groupId>com.querydsl</groupId>
          <artifactId>querydsl-jpa</artifactId>
          <version>${querydsl.version}</version>
      </dependency>
      ```

   3. Add the following plugin to the plugins element below the spring-boot-maven-plugin.

      ```text
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

2. Add this plugin so VSCode finds the classes that Querydsl generates.

   ```text
    <plugin>
        <groupId>org.codehaus.mojo</groupId>
        <artifactId>build-helper-maven-plugin</artifactId>
        <executions>
            <execution>
                <id>add-source</id>
                <phase>generate-sources</phase>
                <goals>
                    <goal>add-source</goal>
                </goals>
                <configuration>
                <sources>
                       <source>${project.build.directory}/generated-sources/java/</source>
                </sources>
                </configuration>
            </execution>
        </executions>
    </plugin>
   ```

3. Create the `BaseRepository.java` file at `api/src/main/java/org/gluestack/api/repository`.

   ```text
    package org.gluestack.api.repository;
   
    import org.springframework.data.querydsl.QuerydslPredicateExecutor;
    import org.springframework.data.repository.CrudRepository;
    import org.springframework.data.repository.NoRepositoryBean;
   
    @NoRepositoryBean
    public interface BaseRepository<T>
                    extends CrudRepository<T, Integer>, QuerydslPredicateExecutor<T> {
   
    }
   ```

4. Create the `OrganisationRepository.java`.

   ```text
    package org.gluestack.api.repository;
   
    import org.gluestack.api.domain.entity.Organisation;
   
    public interface OrganisationRepository extends BaseRepository<Organisation> {
    }
   ```

5. Create the `UserRepository.java`. The findOneByEmail method will allow us to find a User in the database by their email and the EntityGraph annotation will load their Organisation in the same query. This will be useful for authentication. This is where Spring Data JPA is pretty cool, its an interface that automagically implements itself!

   ```text
    package org.gluestack.api.repository;
   
    import org.gluestack.api.domain.entity.User;
    import org.springframework.data.jpa.repository.EntityGraph;
   
    public interface UserRepository extends BaseRepository<User> {
   
        @EntityGraph(attributePaths = { "organisation" })
        User findOneByEmail(String email);
    }
   ```

6. Restart the application to make sure its all correct.

7. Commit your work; "created repository layer".

### Create the Service Layer

The service layer is where most of your API logic lives. Some people choose to split up the service layer further where they see fit but I prefer Services call other Services as required instead of creating mandatory layers.

1. Create the `BaseService.java` file at `api/src/main/java/org/gluestack/api/service`. Its a lot of custom code that I've developed for this project so just copy and paste it from this repo; [BaseService.java](https://github.com/cadbox1/glue-stack/blob/master/api/src/main/java/com/api/service/BaseService.java). You may have to update the package and some of the imports so it compiles.
2. Create the `OrganisationService.java` file in the same folder.

   This demonstrates the general structure of the services:

   There's a method that returns a Querydsl Predicate which is a typesafe database criteria that has defines what entities can be returned from the database. You can see that this will only match the organisation of the current user and this is repeated for the other services as well.

   The create method for an organisation also needs to create a user which this service is not responsible for so it uses a method on the UserService.

   ```text
   package org.gluestack.api.service;
   
   import org.gluestack.api.domain.entity.Organisation;
   import org.gluestack.api.domain.entity.QOrganisation;
   import org.gluestack.api.domain.entity.User;
   import org.gluestack.api.repository.OrganisationRepository;
   import com.querydsl.core.types.Predicate;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.stereotype.Service;
   
   @Service
   public class OrganisationService extends BaseService<Organisation> {
   
       @Autowired
       private OrganisationRepository organisationRepository;
       @Autowired
       private UserService userService;
   
       @Override
       public Predicate getReadPermissionPredicate(User principalUser) {
           return QOrganisation.organisation.id.eq(principalUser.getOrganisation().getId());
       }
   
       public Organisation create(Organisation organisation) {
           User user = organisation.getUsers().get(0);
           user.setOrganisation(organisation);
           userService.preparePassword(user, null);
           return organisationRepository.save(organisation);
       }
   }
   ```

3. Create the `UserService.java`.

   In this Service it overrides one of the save lifecycle methods to implement some extra functionality; hashing a user's plaintext password. The hashing functionality is provided by Spring Security and is important for keeping passwords safe in the database because it is a one way hash, it can't be decrypted. The API validates user's passwords by applying the hash to the password supplied during authentication and is checked against the hash in the database. The only way to 'decrypt' the hash is to generate hashes which should take a long time. That's why new hashing algorithms are created to stay ahead of the speed improvements of computers.

   Java has a convention of `Mapping` which might help here but I don't like the pattern much so i'm trying to avoid it and I think this code is okay.

   ```text
   package org.gluestack.api.service;
   
   import org.gluestack.api.domain.entity.QUser;
   import org.gluestack.api.domain.entity.User;
   import com.querydsl.core.types.Predicate;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.security.crypto.password.PasswordEncoder;
   import org.springframework.stereotype.Service;
   
   @Service
   public class UserService extends BaseService<User> {
   
       @Autowired
       private PasswordEncoder passwordEncoder;
   
       @Override
       public Predicate getReadPermissionPredicate(User principalUser) {
           return QUser.user.organisation.id.eq(principalUser.getOrganisation().getId());
       }
   
       @Override
       public void prepareSaveData(User principalUser, User newEntity, User oldEntity) {
           preparePassword(newEntity, oldEntity);
           super.prepareSaveData(principalUser, newEntity, oldEntity);
       }
   
       public void preparePassword(User newUser, User oldUser) {
           if (oldUser == null || !oldUser.getPassword().equals(newUser.getPassword())) {
               newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
           }
       }
   }
   ```

4. As always, start the appliation to make sure it works then commit your changes.


### Create the Controller layer

The controller layer is what connects our application to the internet. It defines what URLs the application listens to and what Java objects we're expecting to receive or send. Spring MVC will convert the Java objects to and from JSON which is convenient for the frontend.

1. Create the `BaseController.java` at `api/src/main/java/org/gluestack/api/controller`. Again, like the the `BaseService` its custom code so copy and paste it; [BaseController.java](https://github.com/cadbox1/glue-stack/blob/master/api/src/main/java/com/api/controller/BaseController.java).
2. Create the `OrganisationController.java`. This controller is a bit unique because it needs to handle new signups which means it works without a logged in user.

   ```text
   package org.gluestack.api.controller;
   
   import org.gluestack.api.domain.entity.Organisation;
   import org.gluestack.api.service.OrganisationService;
   import javax.validation.Valid;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.security.core.Authentication;
   import org.springframework.web.bind.annotation.RequestBody;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;
   import org.springframework.web.bind.annotation.RestController;
   
   @RestController
   @RequestMapping("api/organisations")
   public class OrganisationController extends BaseController<Organisation> {
   
       @Autowired
       private OrganisationService organisationService;
   
       @Override
       @RequestMapping(method = RequestMethod.POST)
       public Organisation create(Authentication authentication, @RequestBody @Valid Organisation entity) {
           Organisation organisation = organisationService.create(entity);
           organisation.setUsers(null); // this is a bit of a hack to fix some serialisation issues.
           return organisation;
       }
   }
   ```

3. Create the `UserController.java`. This is what our typical controller method looks like, I would have liked to move the findAll method to the BaseController but currently its not possible.

   ```text
   package org.gluestack.api.controller;
   
   import org.gluestack.api.domain.entity.User;
   import org.gluestack.api.service.UserService;
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
   @RequestMapping("api/users")
   public class UserController extends BaseController<User> {
   
       @Autowired
       private UserService userService;
   
       @RequestMapping(method = RequestMethod.GET)
       public Page<User> findAll(Authentication authentication, @QuerydslPredicate Predicate predicate,
               Pageable pageRequest) {
           User principalUser = (User) authentication.getPrincipal();
           return userService.findAll(principalUser, predicate, pageRequest);
       }
   
   }
   ```

4. Create the `AuthenticationController.java`. This is what the frontend will call to login and if authentication is successful it will return the details of the current user.

   ```text
   package org.gluestack.api.controller;
   
   import org.gluestack.api.domain.entity.User;
   import org.springframework.security.core.Authentication;
   import org.springframework.web.bind.annotation.RequestMapping;
   import org.springframework.web.bind.annotation.RequestMethod;
   import org.springframework.web.bind.annotation.RestController;
   
   @RestController
   @RequestMapping("api/authenticate")
   public class AuthenticationController {
   
       @RequestMapping(method = RequestMethod.GET)
       public User authenticate(Authentication authentication) {
           return (User) authentication.getPrincipal();
       }
   }
   ```

5. Run the application and commit your work.

### Final Configuration

1. Add the dependency for Jackson Hibernate Module inside the dependencies element in your `pom.xml` file.

   In Java web applications there is the concept of mapping where you convert your Entities into other Java objects which the API would return. Instead of doing that I prefer to use my Entities for the output but Jackson, the library that spring uses to convert Java objects to and from JSON \(serialisation and deserialisation\), would try and serialise every relation of each entitity \(and their relations and so on and so on\), causing an infinite loop. This library prevents this by making Jackson only serialise the entities that have been loaded from the database. That means if you want to return more data all you have to do is load more data from the database, which you would have to do anyway if you mapped entities.

   ```text
   <dependency>
       <groupId>com.fasterxml.jackson.datatype</groupId>
       <artifactId>jackson-datatype-hibernate5</artifactId>
   </dependency>
   ```

2. Create `WebMvcConfig.java` inside the config folder.

   This will enable the Jackson Hibernate Module and the Spring Data Web Support which converts URL parameters into a Querydsl predicate to support filtering.

   ```text
   package org.gluestack.api.config;

   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.data.web.config.EnableSpringDataWebSupport;
   import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
   import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
   import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
   import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module.Feature;

   @Configuration
   @EnableSpringDataWebSupport
   public class WebMvcConfig implements WebMvcConfigurer {

       @Bean
       public Jackson2ObjectMapperBuilder jacksonBuilder() {
           Jackson2ObjectMapperBuilder b = new Jackson2ObjectMapperBuilder();
           Hibernate5Module hm = new Hibernate5Module();
           hm.enable(Feature.SERIALIZE_IDENTIFIER_FOR_LAZY_NOT_LOADED_OBJECTS);
           hm.disable(Feature.USE_TRANSIENT_ANNOTATION);
           b.modulesToInstall(hm);
           return b;
       }
   }
   ```

3. Create the `UserDetailsService.java`. This will be used to configure Spring Security and will be used as part of authentication.

   ```text
   package org.gluestack.api.config;

   import org.gluestack.api.repository.UserRepository;
   import org.gluestack.api.domain.entity.User;
   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.security.core.userdetails.UserDetails;
   import org.springframework.security.core.userdetails.UserDetailsService;
   import org.springframework.security.core.userdetails.UsernameNotFoundException;
   import org.springframework.stereotype.Service;

   @Service
   public class SecurityUserService implements UserDetailsService {

       @Autowired
       private UserRepository userRepository;

       @Override
       public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
           User user = userRepository.findOneByEmail(email);
           if (user == null) {
               throw new UsernameNotFoundException("Username " + email + " not found");
           }
           return user;
       }
   }
   ```

4. Open up the `WebSecurityConfiguration.java` file. Make it look like this:

   ```text
   package org.gluestack.api.config;

   import org.springframework.beans.factory.annotation.Autowired;
   import org.springframework.context.annotation.Bean;
   import org.springframework.context.annotation.Configuration;
   import org.springframework.http.HttpMethod;
   import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
   import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
   import org.springframework.security.config.annotation.web.builders.HttpSecurity;
   import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
   import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
   import org.springframework.security.config.http.SessionCreationPolicy;
   import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
   import org.springframework.security.crypto.password.PasswordEncoder;

   @Configuration
   @EnableWebSecurity
   @EnableGlobalMethodSecurity(prePostEnabled = true)
   public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

       @Autowired
       private SecurityUserService securityUserService;

       @Bean
       public PasswordEncoder passwordEncoder() {
           return new BCryptPasswordEncoder();
       }

       @Override
       public void configure(AuthenticationManagerBuilder auth) throws Exception {
           auth.userDetailsService(securityUserService).passwordEncoder(passwordEncoder());
       }

       @Override
       protected void configure(HttpSecurity http) throws Exception {
           http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
           http.authorizeRequests().antMatchers(HttpMethod.POST, "/api/organisations").permitAll();
           http.authorizeRequests().antMatchers("/api/**").fullyAuthenticated();
           http.httpBasic();
           http.csrf().disable();
       }
   }
   ```

5. Start the application and commit your work.

### Tests

I'm not the best at tests but I think I like this approach.

1. Add the dependency on [Testcontainers](https://www.testcontainers.org/usage/database_containers.html) in the `pom.xml`.

   Testcontainers allow us use a real MySQL database for our tests and its loaded using docker so you have to have that installed but luckily that's part of our setup scripts.

   ```text
   <dependency>
       <groupId>org.testcontainers</groupId>
       <artifactId>mysql</artifactId>
       <version>1.6.0</version>
       <scope>test</scope>
   </dependency>
   ```

2. Create an `application-test.properties` at `api/src/main/resources/`.

   This will specify to connect to the testcontainers database during testing. You don't need to replace anything in this code snippet.

   ```text
   # database settings
   spring.datasource.url=jdbc:tc:mysql:5.7.21://somehostname:someport/databasename
   spring.datasource.driver-class-name=org.testcontainers.jdbc.ContainerDatabaseDriver
   ```

3. Delete the `ApiApplication.java` file from `api/src/test/java/org/gluestack/api`.

4. In that same directory, create the `BaseTest.java`.

   My current testing strategy is to have a decent amount of test data available so that you don't have to setup a lot of data for new tests. This might not scale in the long run so I may have to break it up a bit but I think the concept of making it really easy to setup data or not having to do it at all is a good.

   The other important thing here is the Transactional annotation. That each test will run in a separate database transaction and will be rolled-back after the test completes. This means the database will be in the same state before each tests regardless of which tests ran before it, making our tests independent.

   ```text
   package org.gluestack.api;
   
   import com.fasterxml.jackson.databind.ObjectMapper;
   import javax.transaction.Transactional;
   import org.gluestack.api.domain.entity.Organisation;
   import org.gluestack.api.domain.entity.Task;
   import org.gluestack.api.domain.entity.User;
   import org.gluestack.api.repository.OrganisationRepository;
   import org.gluestack.api.repository.TaskRepository;
   import org.gluestack.api.repository.UserRepository;
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
   @Transactional
   @TestPropertySource(locations = "classpath:application-test.properties")
   public abstract class BaseTest {
   
   	@Autowired
   	protected MockMvc mvc;
   
   	@Autowired
   	protected ObjectMapper objectMapper;
   
   	@Autowired
   	private TestOrganisationService testOrganisationService;
   }
   ```

5. In that same folder create `TestOrganisation.java`. This is the object to pass around test data.

   ```
   package org.gluestack.api;
   
   import org.gluestack.api.domain.entity.Organisation;
   import org.gluestack.api.domain.entity.Task;
   import org.gluestack.api.domain.entity.User;
   
   public class TestOrganisation {
   
       public Organisation organisation;
   
       public User actingUser;
       public User otherUser;
   
   }
   ```

6. Create `TestOrganisationService.java`. This creates the test data.

   ```
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
   
           return testOrganisation;
       }
   }
   ```

7. Open `BaseTest.java` and add the following to the bottom of the class. This will setup two organisations and their data so that we can reference it for our tests.

   ```
   protected TestOrganisation testOrganisation;
   protected TestOrganisation otherTestOrganisation;
   
   @Before
   public void setup() {
       testOrganisation = testOrganisationService.createTestOrganisiation();
       otherTestOrganisation = testOrganisationService.createTestOrganisiation();
   }
   ```

8. Create a `POJO` for the `PageResponse` the list views return. I'm not 100% sure why we have to do this but its not terribly hard. Copy it from [https://github.com/cadbox1/glue-stack/blob/master/api/src/test/java/com/api/PageResponse.java](https://github.com/cadbox1/glue-stack/blob/master/api/src/test/java/com/api/PageResponse.java)

9. Create `CreateTest.java` at  `api/src/test/java/org/gluestack/api/organisation`

   ```
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
   ```

10. Create `FindAllTest.java` at  `api/src/test/java/org/gluestack/api/user`

   ```
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
   ```

11. At the command line, inside the api folder, run this command to run all the tests.

    ```text
    mvn test
    ```

12. Commit your work.

## UI

### Create React App

1. Open a new terminal in VSCode and run this command.

   ```text
   yarn global add create-react-app
   ```

   This will install `create-react-app` globally. `create-react-app` is by far the most popular way to get a `React` project started.

2. Create a new project by running the command then the name of the project.

   ```text
   create-react-app ui
   ```

3. Follow the commands it displays in the terminal.

   ```text
   cd ui
   yarn start
   ```

   That should open a working react app in your browser, how easy was that!

4. Add this line before the dependencies.

   This will route any unkown urls to our API.

   ```text
   "proxy": "http://localhost:8080",
   ```

5. Stop the front end development server using `Control + c`.
6. Run yarn. This will produce a new lockfile.

   ```text
   yarn
   ```
   
   Yarn is an alternative package manager to npm that uses a lockfile that records the exact version of each dependency that is installed. The lockfile differs from that `package.json` which stores the ranges of versions that are to be installed or updated to. e.g do you want to jump major versions or just minor versions. The lockfile means more consistent results across different environments.

7. Commit your work.
8. create a `.env` file at `ui/`.

   This will allow us to import the folders inside the src folder absolutely instead of relatively which is more robust when moving stuff around. Its always a good idea to link any relative issues in code that help you come to a solution.

   ```text
   // https://github.com/facebookincubator/create-react-app/issues/741#issuecomment-278945308
   NODE_PATH=src/
   ```

9. Create a `.prettierrc.yaml` file.

   This will specify how we want the prettier to format our code, including the prettier VSCode plugin we installed.

   ```text
   useTabs: true
   trailingComma: es5
   ```

10. Create a `tsconfig.json` file.

    This will let VSCode understand our project. Tt will make the autocompletes, called Intellisense in VSCode, a lot more helpful.

    ```text
    {
       "compilerOptions": {
           "allowJs": true,
           "baseUrl": "src/"
       }
    }
    ```

11. Commit your changes.

### Add Libraries

We're going to add some Libraries to our project mainly in the form of dependencies. Just like in Java we're going to have a file that holds our library names and versions so that we can download them all instead of putting them in our project. When we run `yarn add` it will download the library from `NPM` and add it to our `package.json`.

1. Open a terminal window and cd into the ui directory.
2. [React Router](https://github.com/ReactTraining/react-router) \(and friends\). This is for Routing which is about mapping the url in the address bar to different pages in our app.

   ```text
   yarn add react-router-dom
   yarn add history
   yarn add query-string
   ```

3. [Axios](https://github.com/axios/axios) is a small library that makes netwrok requests just that much easier.

   ```text
   yarn add axios
   ```

4. [Material UI Beta](https://material-ui-next.com/). Material UI is the most popular material design library for `React`. This library is going to heavily influence the design of our app using the popular [Material Design](https://material.io/guidelines/) specifications. Their previous version had some pretty big limitations once you got into it but they've learned a lot and delivered a fantastic beta version. Being a Beta they tend to `Move Fast and Break Things` \(and that's a good thing\) so we're going to use the exact version I know works.

   ```text
   yarn add material-ui@1.0.0-beta.23
   yarn add material-ui-icons@1.0.0-beta.17
   ```

5. [Bootstrap](https://getbootstrap.com/). Okay, we definitely shouldn't need this but I know the utilities fairly well so it helped me get the ui working quickly but I will definitely be removing this eventually.

   ```text
   yarn add bootstrap
   ```

6. [React Component Queries](https://github.com/ctrlplusb/react-component-queries) allows us to detect the sizes of components so that we can keep our app responsive and working nicely on mobile devices.

   ```text
   yarn add react-sizeme react-component-queries
   ```

7. Okay this next step is a bit of a cop out. Its the re-usable code I've developed while creating the frontend. I really should be explaining each peice but I think i'll come back and do that later. Sorry!
8. Copy the [common](https://github.com/cadbox1/glue-stack/tree/master/ui/src/common) folder to `ui/src/`.
9. Start the frontend server. This will automatically open the app in a browser window.

   ```text
   yarn start
   ```

10. Setup React Router and Material UI at the root component. Open `App.js`.

    ```text
    import React from "react";
    import { Router } from "react-router-dom";
    import { MuiThemeProvider, createMuiTheme } from "material-ui/styles";
    import { history } from "common/history";
    import "./App.css";
    import "bootstrap/dist/css/bootstrap.css";
    import { Main } from "main";

    const theme = createMuiTheme();

    const App = () => (
       <Router history={history}>
           <MuiThemeProvider theme={theme}>
               <p>App</p>
           </MuiThemeProvider>
       </Router>
    );

    export default App;
    ```

11. The browser window should automatically refresh and display the word "App".
12. Delete the `logo.svg`.
13. Open `App.css`.

    ```text
    html,
    body,
    #root {
        height: 100%;
        width: 100%;
    }

    .h-100vh {
        height: 100vh;
    }
    ```

14. Commit your work.

### API Requests

1. Create a folder called `api` at `ui/src/`.
2. Create the `organisation.js` file.

   ```text
   import axios from "axios";

   const path = "organisations";

   export function save(body) {
       if (body.id) {
           return axios.patch(`${path}/${body.id}`, body);
       } else {
           return axios.post(path, body);
       }
   }
   ```

3. Create the `user.js` file.

   ```text
   import axios from "axios";

   const path = "users";

   export function findAll({ page, size, sort } = {}) {
       return axios.get(path, { params: { page, size, sort } });
   }

   export function findOne(id) {
       return axios.get(`${path}/${id}`);
   }

   export function save(body) {
       if (body.id) {
           return axios.patch(`${path}/${body.id}`, body);
       } else {
           return axios.post(path, body);
       }
   }
   ```

4. Create the `task.js` file.

   ```text
   import axios from "axios";

   const path = "tasks";

   export function findAll({ userId, statusId, page, size, sort } = {}) {
       return axios.get(path, {
           params: { "user.id": userId, statusId, page, size, sort },
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

5. Create the `authentication.js` file.

   ```text
   import axios from "axios";
   import { setCredentials } from "common/axiosConfig";

   const credentialsKey = "credentials";

   export function authenticate({ username, password } = {}) {
       if (username == null) {
           const credentials = getCredentials();
           if (!credentials) {
               return Promise.reject();
           }
           username = credentials.username;
           password = credentials.password;
       }
       return axios
           .get("authenticate", { auth: { username, password } })
           .then(result => {
               setCredentials(username, password);
               saveCredentials(username, password);
               return result;
           });
   }

   export function signOut() {
       setCredentials();
       localStorage.removeItem(credentialsKey);
   }

   function getCredentials() {
       const credentialsJSON = localStorage.getItem(credentialsKey);
       if (!credentialsJSON) {
           return;
       }
       return JSON.parse(credentialsJSON);
   }

   function saveCredentials(username, password) {
       localStorage.setItem(credentialsKey, JSON.stringify({ username, password }));
   }
   ```

6. Commit your work.

### Authentication Component

1. Create a folder called `main` at `ui/src/`.
2. Create the `index.js` file at `ui/src/main`.

   ```text
   import React, { Component } from "react";
   import { connect } from "common/connector";
   import { authenticate, signOut } from "api/authentication";

   class Main extends Component {
       componentDidMount() {
           this.authenticate();
       }

       signOut = () => {
           signOut();
           this.authenticate();
       };

       authenticate() {
           const { authenticate } = this.props;
           authenticate.call().catch(() => authenticate.reset()); // swallow any errors
       }

       render() {
           return <p>Main</p>
       }
   }

   Main = connect({
       authenticate: {
           promise: authenticate,
       },
   })(Main);

   export { Main };
   ```

3. Open `App.js`.
4. Delete the `<p>App</p>` line and start typing the word `<Main`. Then hit enter on the first autocomplete result that says "import main". This will automatically add the import for the `Main` component.
5. Close the `Main` component tag with `/>` so it says `<Main />`.
6. The browser window should now show "Main".
7. Commit your work.

### Login Component

1. Create the `index.js` file at `ui/src/main/unauthenticated/login`.

    ```
    import React, { Component } from "react"; 
    import { Link, withRouter } from "react-router-dom"; 
    import Card, { CardActions, CardContent } from "material-ui/Card"; 
    import Typography from "material-ui/Typography"; 
    import TextField from "common/components/TextField"; 
    import { CircularProgress } from "material-ui/Progress"; 
    import Button from "material-ui/Button";
    ```

   class Login extends Component { 
       constructor(props) { 
           super(props); 
           this.state = { email: "", password: "" }; 
        }

        handleInput = evt => {
            this.setState({text
                [evt.target.name]: evt.target.value,
            });
            const { authenticate } = this.props;
            if (authenticate.rejected) {
                authenticate.reset();
            }
        };
    
        handleSubmit = evt => {
            evt.preventDefault();
            const { email, password } = this.state;
            const { authenticate } = this.props;
            authenticate.call({ username: email, password });
        };
    
        render() {
            const { email, password } = this.state;
            const { authenticate } = this.props;
    
            const invalidLogin =
                authenticate.rejected &&
                authenticate.reason &&
                authenticate.reason.response &&
                authenticate.reason.response.status === 401;
    
            return (
                <div
                    className="d-flex align-items-md-center justify-content-center"
                    style={{ height: "100vh" }}
                >
                    <div style={{ maxHeight: "100%", maxWidth: "350px" }} className="w-100">
                        <Card>
                            <form onSubmit={this.handleSubmit}>
                                <CardContent>
                                    <Typography type="headline" component="h2">
                                        Login
                                    </Typography>
                                    <Typography type="body1">
                                        <Link to="/signup">or Signup Here</Link>
                                    </Typography>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={email}
                                        error={authenticate.rejected}
                                        onChange={this.handleInput}
                                        required
                                    />
                                    <TextField
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        error={authenticate.rejected}
                                        helperText={
                                            (invalidLogin && "Invalid Username or Password") ||
                                            (authenticate.reason && authenticate.reason.message)
                                        }
                                        onChange={this.handleInput}
                                        required
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button raised color="primary" type="submit">
                                        {authenticate.pending ? (
                                            <CircularProgress size={15} />
                                        ) : (
                                            "Login"
                                        )}
                                    </Button>
                                </CardActions>
                            </form>
                        </Card>
                    </div>
                </div>
            );
        }
    }
    
    Login = withRouter(Login);
    
    export { Login };
    ```

2. Create the `index.js` at `ui/src/main/unauthenticated`.

    ```text
    import React, { Component } from "react"; 
    import { Route, Switch } from "react-router-dom"; 
    import { Login } from "./login";

    class Unauthenticated extends Component { 
        render() { 
            return <Login />; 
        } 
    }

    export { Unauthenticated };
    ```

3. Open the `main/index.js` by hitting Command + p then start typing `main` then type `/`.

4. Add this between the start of the render function and the return.

    ```
    const { authenticate } = this.props; 
    if (!authenticate.fulfilled) { 
        return <Unauthenticated authenticate={authenticate} />; 
    }
    ```

    So it looks like this.

    ```
    render() { 
        const { authenticate } = this.props; 
        if (!authenticate.fulfilled) { 
            return <Unauthenticated authenticate={authenticate} />; 
        } 
        return <p>Main</p>; 
    }
    ```

5. Put yor cursor at the end of `Unauthenticated` word then hit Control + space to bring up the autocomplete. Select the option to import the Unauthenticated component, it should be the second option.

6. The browser should now be showing a login form.

### Signup Component

Notice how our Signup Here link doesn't work. Let's fix that.

1. Create the `index.js` file at `ui/src/main/unauthenticated/signup`.

    ```
    import React, { Component } from "react"; 
    import { Link, withRouter } from "react-router-dom"; 
    import { connect } from "common/connector"; 
    import Card, { CardActions, CardContent } from "material-ui/Card"; 
    import Typography from "material-ui/Typography"; 
    import { CircularProgress } from "material-ui/Progress"; 
    import TextField from "common/components/TextField"; 
    import Button from "material-ui/Button"; 
    import { save } from "api/organisation";

    class Signup extends Component { 
        constructor(props) { 
            super(props); 
            this.state = { 
                name: "", 
                firstName: "", 
                lastName: "", 
                email: "", 
                password: "", 
            }; 
        }

        handleFormInput = evt => {
            this.setState({
                [evt.target.name]: evt.target.value,
            });
            const { save } = this.props;
            if (save.rejected) {
                this.props.save.reset();
            }
        };

        handleSubmit = evt => {
            evt.preventDefault();
            const { save } = this.props;
            const { name, firstName, lastName, email, password } = this.state;
            const body = { name, users: [{ firstName, lastName, email, password }] };
            save
                .call(body)
                .then(() => this.props.authenticate.call({ username: email, password }))
                .then(() => this.props.history.push("/"));
        };

        render() {
            const { save } = this.props;
            const { name, firstName, lastName, email, password } = this.state;

            console.log(JSON.stringify(save));

            const emailNotUnique =
                save.rejected &&
                save.reason.response &&
                save.reason.response.data.errors &&
                Array.isArray(save.reason.response.data.errors) &&
                save.reason.response.data.errors.some(
                    error => error.code === "UniqueEmailConstraint"
                );

            return (
                <div
                    className="d-flex align-items-md-center justify-content-center"
                    style={{ height: "100vh" }}
                >
                    <div style={{ maxHeight: "100%", maxWidth: "350px" }} className="w-100">
                        <Card>
                            <form onSubmit={this.handleSubmit}>
                                <CardContent>
                                    <Typography type="headline" component="h2">
                                        Signup
                                    </Typography>
                                    <Typography type="body1">
                                        <Link to="/">or Login Here</Link>
                                    </Typography>
                                    <TextField
                                        name="name"
                                        value={name}
                                        onChange={this.handleFormInput}
                                        label="Organisation"
                                        required
                                    />
                                    <TextField
                                        name="firstName"
                                        value={firstName}
                                        onChange={this.handleFormInput}
                                        label="First Name"
                                        required
                                    />
                                    <TextField
                                        name="lastName"
                                        value={lastName}
                                        onChange={this.handleFormInput}
                                        label="Last Name"
                                        required
                                    />
                                    <TextField
                                        name="email"
                                        value={email}
                                        onChange={this.handleFormInput}
                                        label="Email"
                                        error={emailNotUnique}
                                        helperText={emailNotUnique && "That email is already taken"}
                                        required
                                    />
                                    <TextField
                                        name="password"
                                        value={password}
                                        onChange={this.handleFormInput}
                                        label="Password"
                                        type="password"
                                        required
                                    />
                                </CardContent>
                                <CardActions>
                                    <Button raised color="primary" type="submit">
                                        {save.pending ? <CircularProgress size={15} /> : "Signup"}
                                    </Button>
                                </CardActions>
                            </form>
                        </Card>
                    </div>
                </div>
            );
        }
    }

    Signup = connect({ 
        save: { promise: save, }, 
    })(withRouter(Signup));

    export { Signup };
    ```

2. Open `unauthenticated/index.js` using `Command + p`.

3. Before the `<Route>`, create a route for the signup component.

    ```text
    <Route
        path="/signup"
        render={props => <Signup {...props} {...this.props} />}
    />
    ```

4. Again, use autocomplete to import the signup component. I'm not going to say this anymore you can just do it for new stuff.

5. The signup link should now work as well as the login here link on the signup page.

### First Signup

1. Start the API and Database if they are not already running.

   1. In separate tabs in VSCode.

   2. Database.

        ```text
        docker-compose up
        ```
   
1. API.

    ```text
    cd api
    mvn spring-boot:run
    ```

2. Fill in the signup form and click signup. You should now see the word "Main" which means you are logged in.

### Sidebar

1. Create `index.js` at `ui/src/main/authenticated/sidebar`.

   ```text
   import React, { Component } from "react";
   import { Link, withRouter } from "react-router-dom";
   import Drawer from "./drawer";
   import List, { ListItem, ListItemText } from "material-ui/List";
   import Avatar from "material-ui/Avatar";
   import Collapse from "material-ui/transitions/Collapse";
   import ExpandLess from "material-ui-icons/ExpandLess";
   import ExpandMore from "material-ui-icons/ExpandMore";
   import Divider from "material-ui/Divider";

   class Sidebar extends Component {
       constructor(props) {
           super(props);
           this.state = {
               userMenuOpen: false,
           };
       }
       handleClick = evt => {
           this.setState({ userMenuOpen: !this.state.userMenuOpen });
       };
       render() {
           const { authenticate, showSideBar, signOut, temporaryDock } = this.props;
           const { userMenuOpen } = this.state;
           const user = authenticate.value.data;
           return (
               <Drawer
                   open={showSideBar}
                   type={temporaryDock ? "temporary" : "persistent"}
                   style={{ width: showSideBar ? "256px" : "0px" }}
                   onRequestClose={this.props.toggleSideBar}
               >
                   <List style={{ padding: 0 }}>
                       <ListItem button onClick={this.handleClick}>
                           <Avatar style={{ textTransform: "uppercase" }}>
                               {user.firstName[0]}
                           </Avatar>
                           <ListItemText primary={`${user.firstName} ${user.lastName}`} />
                           {userMenuOpen ? <ExpandLess /> : <ExpandMore />}
                       </ListItem>
                       <Collapse component="li" in={userMenuOpen} unmountOnExit>
                           <List disablePadding>
                               <ListItem button onClick={signOut}>
                                   <ListItemText inset primary="Sign Out" />
                               </ListItem>
                           </List>
                       </Collapse>
                       <Divider />
                       <Link to="/users">
                           <ListItem button>
                               <ListItemText primary="Users" />
                           </ListItem>
                       </Link>
                   </List>
               </Drawer>
           );
       }
   }

   Sidebar = withRouter(Sidebar);

   export { Sidebar };
   ```

2. Create a `drawer.js` file in the same folder.

   ```text
    import React from "react";
    import Drawer from "material-ui/Drawer";
    import { withStyles } from "material-ui/styles";

    const styles = {
        paper: {
            position: "static",
            width: "256px",
        },
    };

    function OverridesClasses({ classes, children, ...props }) {
        return (
            <Drawer
                classes={{
                    paper: classes.paper,
                }}
                {...props}
            >
                {children}
            </Drawer>
        );
    }

    export default withStyles(styles)(OverridesClasses);
   ```

3. Create `index.js` at `ui/src/main/authenticated`.

   ```text
   import React, { Component } from "react";
   import { Redirect, Route, Switch } from "react-router-dom";
   import componentQueries from "react-component-queries";
   import { Sidebar } from "./sidebar";

   class Authenticated extends Component {
       constructor(props) {
           super(props);
           this.state = {
               showSideBar: !props.temporaryDock,
           };
       }

       componentWillReceiveProps(nextProps) {
           if (nextProps.temporaryDock !== this.props.temporaryDock) {
               this.setState({ showSideBar: !nextProps.temporaryDock });
           }
       }

       toggleSideBar = evt => {
           const { showSideBar } = this.state;
           this.setState({ showSideBar: !showSideBar });
       };

       render() {
           const { signOut, temporaryDock } = this.props;
           const { showSideBar } = this.state;
           return (
               <div style={{ display: "flex" }}>
                   <Sidebar
                       temporaryDock={temporaryDock}
                       signOut={signOut}
                       showSideBar={showSideBar}
                       toggleSideBar={this.toggleSideBar}
                       {...this.props}
                   />
                   <button onClick={this.toggleSideBar}>Toggle Sidebar</button>
               </div>
           );
       }
   }

   Authenticated = componentQueries({
       queries: [
           ({ width }) => ({
               temporaryDock: width < 800,
           }),
       ],
       config: { pure: false },
   })(Authenticated);

   export { Authenticated };
   ```

4. Open `main/index.js` and replace `return "Main"` in the render function with:

   ```text
   return <Authenticated signOut={this.signOut} authenticate={authenticate} />;
   ```

5. You should now be able to logout, toggle the sidebar and see how it behaves differently on smaller screens. None of the links change anything but we'll fix that soon.
6. Commit your changes.

### Users

1. Create the `list.js` file at `ui/src/main/authenticated/user/`.

   ```text
   import React, { Component } from "react";
   import { Link } from "react-router-dom";
   import Table, {
       TableBody,
       TableHead,
       TableRow,
       TableFooter,
   } from "material-ui/Table";
   import { TableCell } from "common/components/tableCell";
   import Radio from "material-ui/Radio";
   import { parseURL } from "common/parseURL";
   import { TableSortLabel } from "common/components/tableSortLabel";
   import { TablePagination } from "common/components/tablePagination";
   import { findAll } from "api/user";

   export class List extends Component {
       render() {
           const { findAll, listURL, onSelect, selected } = this.props;
           return (
               <Table>
                   <TableHead>
                       <TableRow>
                           {onSelect && <TableCell padding="checkbox" />}
                           <TableCell>
                               <TableSortLabel findAll={findAll} property="firstName">
                                   Name
                               </TableSortLabel>
                           </TableCell>
                           <TableCell>
                               <TableSortLabel findAll={findAll} property="email">
                                   Email
                               </TableSortLabel>
                           </TableCell>
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {findAll.rejected && (
                           <TableRow>
                               <TableCell colSpan={2}>
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
                           findAll.value.data.content.map(row => {
                               const name = `${row.firstName} ${row.lastName}`;
                               return (
                                   <TableRow
                                       key={row.id}
                                       onClick={onSelect && onSelect.bind(null, row)}
                                       hover={onSelect}
                                       style={{ cursor: onSelect ? "pointer" : "default" }}
                                       selected={selected && selected.includes(row.id)}
                                   >
                                       {onSelect && (
                                           <TableCell padding="checkbox">
                                               <Radio checked={selected && selected.includes(row.id)} />
                                           </TableCell>
                                       )}
                                       <TableCell>
                                           {listURL ? (
                                               <Link to={`${listURL}/${row.id}`}>{name}</Link>
                                           ) : (
                                               name
                                           )}
                                       </TableCell>
                                       <TableCell>{row.email}</TableCell>
                                   </TableRow>
                               );
                           })}
                   </TableBody>
                   {findAll.fulfilled && (
                       <TableFooter>
                           <TableRow>
                               <TablePagination findAll={findAll} />
                           </TableRow>
                       </TableFooter>
                   )}
               </Table>
           );
       }
   }

   export const connectConfig = {
       findAll: {
           params: props => parseURL(props),
           promise: findAll,
       },
   };
   ```

2. Create the `form.js` file in the same folder.

   ```text
   import React, { Component } from "react";
   import { Link } from "react-router-dom";
   import AppBar from "material-ui/AppBar";
   import IconButton from "material-ui/IconButton";
   import Close from "material-ui-icons/Close";
   import TextField from "common/components/TextField";
   import Button from "material-ui/Button";
   import Paper from "material-ui/Paper";
   import Toolbar from "material-ui/Toolbar";
   import Typography from "material-ui/Typography";
   import { CircularProgress } from "material-ui/Progress";
   import { findOne, save } from "api/user";
   import { connect } from "common/connector";

   class Form extends Component {
       constructor(props) {
           super(props);
           this.state = this.defaultState;
           if (props.match.params.id) {
               // eslint-disable-next-line
               this.state.password = undefined;
           }
       }

       defaultState = {
           id: null,
           firstName: "",
           lastName: "",
           email: "",
           password: "",
       };

       componentDidMount() {
           if (this.props.findOne) {
               this.props.findOne.subscribe(value => {
                   const { id, firstName, lastName, email } = value.data;
                   this.setState({ id, firstName, lastName, email });
               });
           }
       }

       handleSubmit = evt => {
           evt.preventDefault();
           const { save, refreshList, history } = this.props;
           save.call(this.state).then(result => {
               if (refreshList) {
                   refreshList();
               }
               if (!this.state.id) {
                   history.push(`/users/${result.data.id}`);
               }
           });
       };

       handleFormInput = evt => {
           this.setState({ [evt.target.name]: evt.target.value });
       };

       handleResetPassword = evt => {
           this.setState({ password: "" });
       };

       render() {
           const { id, firstName, lastName, email, password } = this.state;
           const { className } = this.props;
           return (
               <Paper className={className} elevation={1}>
                   <AppBar position="static">
                       <Toolbar>
                           <Typography type="title" color="inherit" className="mr-auto">
                               {id ? `${firstName} ${lastName}` : "Create"}
                           </Typography>
                           <Link to={`/users`}>
                               <IconButton color="contrast">
                                   <Close />
                               </IconButton>
                           </Link>
                       </Toolbar>
                   </AppBar>
                   <form onSubmit={this.handleSubmit} className="container-fluid">
                       <TextField
                           name="firstName"
                           value={firstName}
                           onChange={this.handleFormInput}
                           label="First Name"
                           required
                       />
                       <TextField
                           name="lastName"
                           value={lastName}
                           onChange={this.handleFormInput}
                           label="Last Name"
                           required
                       />
                       <TextField
                           name="email"
                           value={email}
                           onChange={this.handleFormInput}
                           label="Email"
                           required
                       />
                       {password !== undefined ? (
                           <TextField
                               name="password"
                               type="password"
                               value={password}
                               onChange={this.handleFormInput}
                               label="Password"
                               required
                           />
                       ) : (
                           <Button type="button" onClick={this.handleResetPassword}>
                               Reset Password
                           </Button>
                       )}
                       <Button raised className="d-block" type="submit" color="primary">
                           {save.pending ? (
                               <CircularProgress size={15} />
                           ) : id ? (
                               "Save"
                           ) : (
                               "Create"
                           )}
                       </Button>
                   </form>
               </Paper>
           );
       }
   }

   export default Form;

   export const Create = connect({ save: { promise: save } })(Form);

   export const Edit = connect({
       findOne: {
           params: props => props.match.params.id,
           promise: findOne,
       },
   })(Create);
   ```

3. Create the `index.js` file.

   ```text
   import React, { Component } from "react";
   import { Link, Route, Switch } from "react-router-dom";
   import componentQueries from "react-component-queries";
   import AppBar from "material-ui/AppBar";
   import Toolbar from "material-ui/Toolbar";
   import Typography from "material-ui/Typography";
   import IconButton from "material-ui/IconButton";
   import MenuIcon from "material-ui-icons/Menu";
   import Add from "material-ui-icons/Add";
   import Refresh from "material-ui-icons/Refresh";
   import { CircularProgress } from "material-ui/Progress";
   import { connect } from "common/connector";
   import { urlStateHolder } from "common/stateHolder";

   import { connectConfig, List } from "./list";
   import { Create, Edit } from "./form";

   class User extends Component {
       render() {
           const { match, findAll, singleView, toggleSideBar } = this.props;

           return (
               <div className="row no-gutters w-100">
                   <Route
                       path={`${match.path}`}
                       exact={singleView}
                       render={props => (
                           <div className="col h-100vh">
                               <AppBar position="static">
                                   <Toolbar>
                                       <IconButton
                                           onClick={toggleSideBar}
                                           color="contrast"
                                           aria-label="Menu"
                                       >
                                           <MenuIcon />
                                       </IconButton>
                                       <Typography color="inherit" type="title" className="mr-auto">
                                           Users
                                       </Typography>
                                       <IconButton color="contrast" onClick={findAll.refresh}>
                                           {findAll.pending ? (
                                               <span>
                                                   <CircularProgress color="inherit" size={14} />
                                               </span>
                                           ) : (
                                               <Refresh />
                                           )}
                                       </IconButton>
                                       <Link to={`${match.path}/create`}>
                                           <IconButton color="contrast">
                                               <Add />
                                           </IconButton>
                                       </Link>
                                   </Toolbar>
                               </AppBar>
                               <List listURL={match.path} findAll={findAll} />
                           </div>
                       )}
                   />
                   <Switch>
                       <Route
                           path={`${match.path}/create`}
                           render={props => (
                               <Create
                                   {...props}
                                   className="col h-100vh"
                                   refreshList={singleView ? undefined : findAll.refresh}
                               />
                           )}
                       />
                       <Route
                           path={`${match.path}/:id`}
                           render={props => (
                               <Edit
                                   {...props}
                                   className="col h-100vh"
                                   refreshList={singleView ? undefined : findAll.refresh}
                               />
                           )}
                       />
                   </Switch>
               </div>
           );
       }
   }

   User = componentQueries({
       queries: [
           ({ width }) => ({
               singleView: width < 1000,
           }),
       ],
       config: { pure: false },
   })(urlStateHolder(connect(connectConfig)(User)));

   export { User };
   ```

4. Replace the button in the `authenticated/index.js` file with these routes.

   ```text
   <Switch>
       <Route
           path="/me"
           render={props => (
               <Me
                   {...props}
                   {...this.props}
                   toggleSideBar={this.toggleSideBar}
               />
           )}
       />
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
       <Route
           path="/users"
           render={props => (
               <User
                   {...props}
                   {...this.props}
                   toggleSideBar={this.toggleSideBar}
               />
           )}
       />
       <Route exactly path="/" render={() => <Redirect to="/users" />} />
   </Switch>
   ```

5. Add the `react-router` imports and use the auto import for the User component

   ```text
   import { Switch, Route, Redirect } from "react-router-dom"
   ```

6. Commit your work.

