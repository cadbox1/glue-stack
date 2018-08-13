# Read Me

## What

* A mobile friendly web application to manage your organisation's tasks and assign them to users.
* Built with a React, Java \(Spring Boot\) JSON web API, MySQL relational database in a monolithic architecture on AWS
* Beginner friendly documentation for developing the application. 

If you're reading this on GitHub, then be aware that this same documentation is a lot nicer in our [GitBook](https://cadbox1.gitbook.io/glue-stack/).

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/glue-stack) [![Build Status](https://travis-ci.com/cadbox1/glue-stack.svg?branch=master)](https://travis-ci.com/cadbox1/glue-stack)

![Screeshot](.gitbook/assets/screenshot%20%281%29.png)

## Table of Contents

* [Glue Stack](readme-1.md#glue-stack)
  * [What](readme-1.md#what)
  * [Table of Contents](readme-1.md#table-of-contents)
  * [Getting Started](readme-1.md#getting-started)
  * [Why](readme-1.md#why)
  * [Why](readme-1.md#why)
  * [Features](readme-1.md#features)
    * [Managing Resources](readme-1.md#managing-resources)
  * [Architecture](readme-1.md#architecture)
    * [Application Tools](readme-1.md#application-tools)
    * [Development Tools](readme-1.md#development-tools)

## Getting Started

* Check out the [live app](https://d1if23x0agu0jj.cloudfront.net/).
* We have a [pretty website](https://cadbox1.github.io/glue-stack/).
* Our documentation looks great in our [GitBook](https://cadbox1.gitbook.io/glue-stack/)
* Check out our [Architecture](architecture.md).
* Check out our [development process](development/developmentprocess-tasks.md).
* [Run it locally](https://github.com/cadbox1/glue-stack/tree/edc76cc0d167d03084e766b0896fdd5a8bc5d171/docs/development/runninglocally.md).
* Check out our [roadmap](https://github.com/cadbox1/glue-stack/projects/3).
* Check out our [chat](https://spectrum.chat/glue-stack).
* If you're really keen then [build Glue Stack from an empty folder](development/buildinggluestackfromanemptyfolder.md).

Please remember to star this project on GitHub if you think it is remotely cool!

## Why

Please don't forget to star us on GitHub if you think this is remotely cool!

## Why

* Document how I currently build web applications.
* Show why a monolithic application with SQL and Java is still cool.
* Show how to create development process documentation. Tests aren't the only way to increase sotware quality.
* A playground to experiment with new ideas.
* To optimise for simplicity and development speed without comprimising quality.

## Features

Check out the [live app!](https://d1if23x0agu0jj.cloudfront.net/)

* Sign up your organisation
* Login and Logout
* Manage your assigned tasks
* Manage your organisation's tasks
* Manage your users

### Managing Resources

The term `CRUD` \(Create, Rertrieve, Update, Delete\) is often used to describe a big part of a lot of applications. I think the word `CRUD` oversimplifies the problem and prefer to think about it in terms of `Managing Resources`.

* Operations. Including mobile devices.
  * Retrieval
    * Viewing a single resource
    * Collections
      * Searching
      * Filtering
      * Sorting
      * Pagination
  * Storage
    * Create
    * Edit
    * Delete
* Security
  * Authentication: Users must be logged in so we can check authorisations
  * Authorisation
    * Multi-tenancy: users can only manage resources in their own organisation
    * Permissions: different users can access different resources within their organisation
    * Feature toggles: developers can toggle different features or operations for an organisation

I believe by optimising and standardising the way we address `Managing Resources` will go a long way to increasing development speed without comprimising quality in an application. I have designed this application to address the pattern through both architecture and development process documentation.

## Architecture

Multitenant, monolithic, 3-tier application with a MySQL database, Spring Boot HTTP API and React Single Page Application.

| Tier/Component | Type | Language | Implementation |
| :--- | :--- | :--- | :--- |
| DB \(Database\) | Relational | SQL | MySQL \(pronounced "my sequel"\) |
| API \(Application Programming Interface\) | JSON over HTTP | Java | Spring Boot |
| UI \(User Interface\) | SPA \(Single Page Application\) | Javascript | React |

Continued at [Architecture](architecture.md).

### Application Tools

SQL, Java, Javascript, HTML and CSS are still the most popular technologies among developers in 2018. [Most Popular Technologies, Developer Survey Results - Stack Overflow](https://insights.stackoverflow.com/survey/2018/#most-popular-technologies). My programming career has put in me in close contact with all of them so I want to show you how cool they can be before some other technology becomes more popular.

* Database
  * [MySQL](https://en.wikipedia.org/wiki/MySQL)
    * An older, common relational database that I have the most experience with.
* API
  * \[Java\]\([https://en.wikipedia.org/wiki/Java\_\(programming\_language](https://en.wikipedia.org/wiki/Java_%28programming_language)\)\)
  * [Spring Boot](https://spring.io/projects/spring-boot#overview)
    * An easy and opionated way to create Java applications.
  * [Hibernate](http://hibernate.org/orm/)
    * A popular [ORM](https://stackoverflow.com/questions/1279613/what-is-an-orm-and-where-can-i-learn-more-about-it) for Java that maps objects to and from the database.
  * [Spring Security](https://spring.io/projects/spring-security)
    * To authenticate users.
  * [Spring Data JPA](https://projects.spring.io/spring-data-jpa/)
    * Helpful abstraction for doing CRUD.
* UI
  * [React](https://reactjs.org/)
    * Simple, powerful and popular.
  * [Create React App](https://github.com/facebook/create-react-app)
    * For an opionated, zero-configuration build process. 
  * [Material-UI](https://material-ui.com/)
    * Implementation of the popular [Google Material Design System](https://material.io/) in React.
  * [React Router V4](https://reacttraining.com/react-router/)
    * URL management.

### Development Tools

Our number 1 development tool is our [development process documentation!](development/developmentprocess-tasks.md)

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
    * The best Mac app to connect to manage MySQL databases.
* Deployment
  * [Flyway](https://flywaydb.org/)
    * for automated database migrations.

