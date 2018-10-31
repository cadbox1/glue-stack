# Glue Stack

If you're reading this on [GitHub](https://github.com/cadbox1/glue-stack/), then checkout our [GitBook](https://cadbox1.gitbook.io/glue-stack/) for a nicer reading experience.

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/glue-stack)
[![Build Status](https://travis-ci.com/cadbox1/glue-stack.svg?branch=master)](https://travis-ci.com/cadbox1/glue-stack)

![Screeshot](./Screenshot.png)

## Quick Start

* Signup for a free account on our [website](https://cadbox1.github.io/glue-stack/).
* [Chat](https://spectrum.chat/glue-stack) with us.
* Read on.

Star us on [GitHub](https://github.com/cadbox1/glue-stack/) if you think we're cool!

## What problem are we solving?
* We do core features, like storing and finding data, really well. We make it fast, easy and enjoyable to manage your data and we do it with security and scalability.
* We believe the foundation of a good user experience is a good developer experience. If we optimise the developer experience we can deliver the quality users expect in less time, leaving more time to focus on core business problems that make your application unique.
* This is contrasted to usual development teams with existing architectures, siloed teams, drip fed features and pressure to develop features that make the product unique. This makes it hard to even identify the core features let alone solve them well and leads to a compromised developer experience.

## How do we do it?
  - Glue Stack is designed from the ground up to deliver core features that users expect without comprimising developer experience.
  - We scoped out the requirements and glued some of the best developer tools together to create glue stack.
  - To keep the domain simple but relevant, glue stack's domain is multiuser task management, inspired by [TodoMVC](http://todomvc.com/).
  - We designed our user interface using Google's Material Design components, with a mobile first mindset, developed a secure, performant and flexbile API and backed that with a relational database.
  - Then we built the whole thing from scratch again and documented the entire process. This allowed us to identify development pain points while refining the process and documentation.

## Features
### User Features
  - Browser based
  - Mobile ready
  - Easy to find data using search, filters and sorting
  - Fast
  - Secure
  - Reliable
  - Consistent user interface
  - Feels good to use
  - Bulk actions
  - Activity log
  - API for integrations
  - New features are delivered quickly

### Developer Features
  - Documentated Architecture and [Development Process](./Development/DevelopmentProcess-Tasks.md)
  - Deployed in the cloud
  - Reusable components with [good abstractions](#featured-abstractions)
  - Fast to develop
  - Easy to scale
  - Easy to secure
  - Responsive interface - not a speparate mobile app to maintain
  - Efficient testing strategy
  - [Continuous Integration](./Infrastructure/ContinuousIntegration-TravisCI.md)
  - Multitenant
  - API for separation
  - [Performance testing](./Infrastructure/PerformanceTestingAndConnectionPoolSizes.md)


## Architecture

Multitenant, monolithic, 3-tier application with a MySQL database, Spring Boot HTTP API and React Single Page Application.

| Tier/Component                            | Type                            | Language   | Implementation                   |
| ----------------------------------------- | ------------------------------- | ---------- | -------------------------------- |
| DB \(Database\)                           | Relational                      | SQL        | MySQL \(pronounced "my sequel"\) |
| API \(Application Programming Interface\) | JSON over HTTP                  | Java       | Spring Boot                      |
| UI \(User Interface\)                     | SPA \(Single Page Application\) | Javascript | React                            |

Continued at [Architecture](./Architecture/Architecture.md).

### Featured Abstractions

#### API
[Querydsl](http://www.querydsl.com/) for composing type safe database queries inside the API and bulding queries from request parameters. Querydsl makes it easy to have a secure, performant API whilst supporting the wide range of front end queries we require. Without it, the API would be an error prone, string concatenation mess.

#### UI

[React](https://reactjs.org/) is a really simple but powerful abstraction for the frontend especially when the setup is taken care of by [Create React App](https://github.com/facebook/create-react-app).


Our custom [connect component](./Development/UIConnectComponent.md) turned out to be an essential abstraction for this project when handling network requests in React. It allowed us to make our UI simpler and less stateful than other single page applications.

[Material-UI](https://material-ui.com/) for the building blocks of user interfaces. This type of library is essential for efficient front end development and really highlights how useful React can be.
