# Architecture

```sequence
Browser->API: GET me some data
API->Database: data please
Database->API: here is the table of data
API->Browser: here is the data in JSON
```

```
+---------+                     +-----+                        +----------+
| Browser |                     | API |                        | Database |
+---------+                     +-----+                        +----------+
     |                             |                              |
     | GET me some data            |                              |
     |---------------------------->|                              |
     |                             |                              |
     |                             | data please                  |
     |                             |----------------------------->|
     |                             |                              |
     |                             |    here is the table of data |
     |                             |<-----------------------------|
     |                             |                              |
     |    here is the data in JSON |                              |
     |<----------------------------|                              |
     |                             |                              |
```

The browser can also make changes to data using the same flow but with different HTTP methods like POST and PATCH.

## The Stack

Multitenant, monolithic, 3-tier application with a MySQL database, Spring Boot HTTP API and React Single Page Application.

| Tier/Component                            | Type                            | Language   | Implementation                   |
| ----------------------------------------- | ------------------------------- | ---------- | -------------------------------- |
| DB \(Database\)                           | Relational                      | SQL        | MySQL \(pronounced "my sequel"\) |
| API \(Application Programming Interface\) | JSON over HTTP                  | Java       | Spring Boot                      |
| UI \(User Interface\)                     | SPA \(Single Page Application\) | Javascript | React                            |

## Tier Responsibilities

| Tier/Component | Where it runs                                    | Infrastructure                                                                                | Storage & Retrieval | Security | Navigation |
| -------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------- | -------- | ---------- |
| DB             | Private server \(cloud\)                         | [AWS RDS](https://aws.amazon.com/rds/)                                                        | yes                 |          |            |
| API            | Public server \(internet facing\) \(cloud\)      | [AWS Elastic Beanstalk](https://aws.amazon.com/elasticbeanstalk/)                             | yes                 | yes      |            |
| UI             | Internet browsers \(desktop and mobile devices\) | [AWS S3](https://aws.amazon.com/s3/) and [AWS CloudFront](https://aws.amazon.com/cloudfront/) | yes                 | yes      | yes        |

You can see the separation in responsbility here but I also want to highlighting the sharing of responsbility with storing and retrieving data.

### Security

It is important to ["never trust the client"](https://www.google.com.au/search?q=never+trust+the+client&oq=never+trust+the+client&aqs=chrome..69i57j69i60l5.3452j0j4&sourceid=chrome&ie=UTF-8). In our application the client refers to the ui and the reason for that is because we can't control client side code - anyone can run anything in their own browser. That's why we have an API so that users can't directly access our database and potentially other organisations' data. I see it as a middleman between the user and the database. It is primarily in charge of enforcing the security as well as preparing the data from the database. When I talk about security i'm talking about users that aren't logged in don't have access and users that are logged in only see their own organisation's tasks.

## Monolithic

This architecture is commonly referred to as a [monolith](https://en.wikipedia.org/wiki/Monolithic_application) or monolithic which means it is more or less deployed as a single unit. I think of it as a monolith though others might argue that it isn't because the ui is separate. It gets a little bit confusing because the word monolith is often used negatively, like in the wikipedia article, because monoliths, like any application, can be horrible but I like this architecture and i'm not the only one. See [the majestic monolith](https://news.ycombinator.com/item?id=11195798) for more. 

An alternative architecture is [microservices](https://en.wikipedia.org/wiki/Microservices) where a single application is made up of individually deployed services which mainly offers performance benefits. My biggest issue with microservices is their local development experience though tools like [serverless framework](https://serverless.com/) are closing that gap. This monolith is designed to be a joy to develop on, something i'm not sure I could achieve with a microservice architecture. This whole architecture can easily be run entirely on your local machine and that's an important part of our development process.

## Multitenant

[Multitenancy](https://en.wikipedia.org/wiki/Multitenancy) means to store multiple tenants on a single instance. In this case we store multiple organisation's in the same database and access it using the same API. This means there is less isolation between organisations' data but makes this application a lot simpler to manage.

## Application Tools 

SQL, Java, Javascript, HTML and CSS are still the most popular technologies among developers in 2018. [Most Popular Technologies, Developer Survey Results - Stack Overflow](https://insights.stackoverflow.com/survey/2018/#most-popular-technologies) and I know them pretty well.

* Database
  * [MySQL](https://en.wikipedia.org/wiki/MySQL)
    * An older, common relational database that I have the most experience with.
* API
  * [Java](https://en.wikipedia.org/wiki/Java_%28programming_language%29)
  * [Spring Boot](https://spring.io/projects/spring-boot#overview)
    * An easy and opionated way to create Java applications.
  * [Hibernate](http://hibernate.org/orm/)
    * A popular [ORM](https://stackoverflow.com/questions/1279613/what-is-an-orm-and-where-can-i-learn-more-about-it) for Java that maps objects to and from the database.
  * [Spring Security](https://spring.io/projects/spring-security)
    * To authenticate users.
  * [Spring Data JPA](https://projects.spring.io/spring-data-jpa/)
    * Helpful abstraction for doing CRUD.
  * [Querydsl](http://www.querydsl.com/)
    * Creating typesafe and composable database queries even directly from http requests.
* UI
  * [React](https://reactjs.org/)
    * Simple, powerful and popular.
  * [Create React App](https://github.com/facebook/create-react-app)
    * For an opionated, zero-configuration build process. 
  * [Material-UI](https://material-ui.com/)
    * Implementation of the popular [Google Material Design System](https://material.io/) in React.
  * [React Router V4](https://reacttraining.com/react-router/)
    * URL management.

## Development Tools

Our number 1 development tool is our [development process documentation!](./Development/DevelopmentProcess-Tasks.md)

* [Version Control](https://www.atlassian.com/git/tutorials/what-is-version-control)
  * [Git](https://git-scm.com/)
    * Popular and works well.
  * [Monorepo](https://danluu.com/monorepo/)
    * For simplicity and synced changes across the application.
  * [Git Town](http://www.git-town.com/)
    * An abstraction over git to make it easier to do common things.
* Editors
  * [Visual Studio Code \(vscode\)](https://code.visualstudio.com/)
    * Fast and popular editor.
  * [Sequel Pro](https://www.sequelpro.com/)
    * The best Mac app to manage MySQL databases.
* Deployment
  * [Flyway](https://flywaydb.org/)
    * for automated database migrations.