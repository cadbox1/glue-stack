# Glue Stack

If you're reading this on our [GitHub](https://github.com/cadbox1/glue-stack/), then checkout our [GitBook](https://cadbox1.gitbook.io/glue-stack/) for a nicer reading experience.

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/glue-stack)
[![Build Status](https://travis-ci.com/cadbox1/glue-stack.svg?branch=master)](https://travis-ci.com/cadbox1/glue-stack)

![Screeshot](./Screenshot.png)

## Getting Started

* Check out the [live app](https://d1if23x0agu0jj.cloudfront.net/).
* We have a [pretty website](https://cadbox1.github.io/glue-stack/).
* Our documentation looks great in our [GitBook](https://cadbox1.gitbook.io/glue-stack/)
* Check out our [Architecture](Architecture/Architecture.md).
* Check out our [development process](Development/DevelopmentProcess-Tasks.md).
* [Run it locally](development/runninglocally.md).
* Check out our [roadmap](https://github.com/cadbox1/glue-stack/projects/3).
* Check out our [chat](https://spectrum.chat/glue-stack).
* If you're really keen then [build Glue Stack from an empty folder](./Development/BuildingGlueStackFromAnEmptyFolder.md).

Please don't forget to star us on GitHub if you think we're remotely cool!

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

## User Requirements
  - works in your browser
  - works on mobile
  - easy to find data using search, filters and sorting
  - fast
  - secure
  - reliable
  - consistent user interface patterns
  - feels good to use
  - bulk actions
  - activity log
  - api for integration
  - new features are delivered quickly

## Developer Requirements
  - documentation for core basic features including the development process
  - deployed in the cloud
  - reusable components with good abstractions
  - fast to develop
  - easy to scale
  - easy to secure
  - responsive interface - not a spearate mobile app to maintain
  - efficient testing strategy
  - continuous integration
  - multitenancy
  - API based for separation


## Architecture

Multitenant, monolithic, 3-tier application with a MySQL database, Spring Boot HTTP API and React Single Page Application.

| Tier/Component                            | Type                            | Language   | Implementation                   |
| ----------------------------------------- | ------------------------------- | ---------- | -------------------------------- |
| DB \(Database\)                           | Relational                      | SQL        | MySQL \(pronounced "my sequel"\) |
| API \(Application Programming Interface\) | JSON over HTTP                  | Java       | Spring Boot                      |
| UI \(User Interface\)                     | SPA \(Single Page Application\) | Javascript | React                            |

Continued at [Architecture](./Architecture/Architecture.md).

## What Next?

[Get Started!](./README.md#getting-started)