# Glue Stack

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/glue-stack)
![](https://github.com/cadbox1/glue-stack/workflows/Pull%20Request/badge.svg)
![](https://github.com/cadbox1/glue-stack/workflows/Push/badge.svg)

![Screeshot](./website/src/assets/screenshot.png)

## Quick Start

- Signup for free from our [Website](https://glue.cadell.dev)
- [Chat](https://spectrum.chat/glue-stack) with us.
- Explore this documentation.

Star us if you think we're cool!

## What problem are we solving?

- We do core features, like storing and finding data, really well. We make it fast, easy and enjoyable to manage your data and we do it with security and scalability.
- We believe the foundation of a good user experience is a good developer experience. If we optimise the developer experience we can deliver quality features fast, leaving more time to focus on what makes your application unique.

## How do we do it?

- Glue Stack is designed from the ground up to deliver core features that users expect without comprimising developer experience.
- To achieve that developer experience we glued some of the best open source tools together to create Glue Stack.
- To keep the domain simple but relevant, Glue Stack is a multiuser task management app, inspired by [TodoMVC](http://todomvc.com/), but with more backend.
- We designed our user interface using a selection of Google's Material Design components optimised for mobile, developed a secure, performant and flexbile API backed by a relational database. A little bit of new tech combined with a lot of tried and tested.
- Then we built the whole thing from scratch again and documented the entire process. This allowed us to identify development pain points and refine the process and documentation.

## Hasn't this been done this before?

I've seen application frameworks optimised for development speed before, along the lines of [Firebase](https://firebase.google.com/), that can get you an application incredibly fast. I think these types of tools are optimised for an [MVP](https://en.wikipedia.org/wiki/Minimum_viable_product) or greenfield project and less suited for the long term. A NoSQL database is a big jump coming from a relational database and often a hard sell for good reason.

That brings us to the other end of the spectrum with more flexible tools like [React](https://reactjs.org/). You'll have to choose all the tools yourself and glue them all together. Compared to the framework approach, this option often leads to a poor developer experience due to a lack of documentation about how your glue actually works. Not to mention your unique combination of tools will have unique problems that will require unique solutions. Siloed teams and drip-fed features only make this harder.

Glue Stack is an experiment to find the middleground between the two. We try to achieve a good developer experience by documenting the glue that holds our tools together. We try not to write too much custom code requiring documentation and prefer tried and tested tools like Java and MySQL mixed with a bit of new stuff with React. By open sourcing and sharing Glue Stack we hope to give you some ideas on how you might improve your own glue stack and give you the opportunity to improve ours.

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

### Featured Tools

#### Custom Tools

The [Glue Stack Connect Component](./Development/UIConnectComponent.md) turned out to be an essential abstraction for this project when handling network requests in React. It allowed us to make our UI simpler and less stateful than other single page applications.

#### API

[Querydsl](http://www.querydsl.com/) for composing type safe database queries inside the API and bulding queries from request parameters. Querydsl makes it easy to have a secure, performant API whilst supporting the wide range of front end queries we require. Without it, the API would be an error prone, string concatenation mess.

#### UI

[React](https://reactjs.org/) is a really simple but powerful abstraction for the frontend especially when the setup is taken care of by [Create React App](https://github.com/facebook/create-react-app).

[Material-UI](https://material-ui.com/) for the building blocks of user interfaces. This type of library is essential for efficient front end development and really highlights how useful React can be. This highlights one of the reasons Glue Stack exists because even with an excellent library like this we still need to choose the components that will work best for our app and its requirements.
