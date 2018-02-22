# Glue Stack
My favourite tools and practises glued together to make a multi-tenant todo application where organisations can sign up and manage their users' tasks.

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/glue-stack)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/cadbox1/glue-stack.png?columns=all)](https://waffle.io/cadbox1/glue-stack?utm_source=badge)

![Screeshot](./Screenshot.png)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Why](#why)
- [Architecture](#architecture)
- [Application Features](#application-features)
- [Common Features](#common-features)
    - [Managing Resources](#managing-resources)
- [Tier Responsibilities](#tier-responsibilities)
- [Tools](#tools)
    - [Stack Tools](#stack-tools)
    - [Development Tools](#development-tools)
- [Running Locally](#running-locally)
- [Setup Development Tools](#setup-development-tools)
    - [Setup Sequel Pro (Database)](#setup-sequel-pro-database)
    - [Setup Visual Studio Code (vscode)](#setup-visual-studio-code-vscode)
- [Developing Documentation](#developing-documentation)

## Why
* Share how I currently build web applications
* Understand how my favourite tools and practices fit together in a real application
* Establish a standard to compare new tools and processes with
* Establish some common web application concepts and how to build them
* Demonstrate my idea of documentation

## Architecture
Multitenant, monolithic, 3-tier application with a MySQL database, Spring Boot HTTP API and React Single Page Application.

| Tier                                    | Type                          | Language   | Implementation                 |
| --------------------------------------- | ----------------------------- | ---------- | ------------------------------ |
| DB (Database)                           | Relational                    | SQL        | MySQL (pronounced "my sequel") |
| API (Application Programming Interface) | HTTP with JSON                | Java       | Spring Boot                    |
| UI (User Interface)                     | SPA (Single Page Application) | Javascript | React                          |

Expanded [later on](#tier-responsibilities). 

## Application Features

* Sign up your organisation
* Login and Logout
* Manage your assigned tasks
* Manage your organisation's tasks 
* Manage your users

## Common Features
CRUD is commonly used to describe a set of common features in applications - Create, Retrieve, Update, Delete. Our application certainly does CRUD but i feel like it is a low-level term that can over-simplify the problem. I like to think about it in terms of `Managing Resources`.

### Managing Resources 

- Operations
  - Retrieval
    - Viewing a single resource
    - Collections
      - Searching
      - Filtering
      - Sorting
      - Pagination
  - Storage
    - Create
    - Edit
    - Delete
- Security
  - Authentication: Users must be logged in so we can check authorisations
  - Authorisation
    - Multi-tenancy: users can only manage resources in their own organisation
    - Permissions: different users can access different resources within their organisation
    - Feature toggles: developers can toggle different features or operations for an organisation
- Mobile friendly: all operations must work across devices

These are our core features that will be used over and over again in our app. Managing your personal tasks,  organisation's users and organisation's tasks will all follow the same `Managing Resources` pattern. Even signup is a Create operation. 

We will design our stack and documentation to address these core features because they will be used throughout the life of the app. For example, users may want comments on tasks in the future. We could sit down and have a think about the best tool for the job, with maybe a nosql database, research what other companies are doing with comments, should they be nested or flat and come up with a solution. But I would prefer to apply our `Managing Resources` framework to get something usable to the customer fast. It should be trivial to do so not because its an 'easy' solution but because we've designed the application specifically to `Manage Resources` AND because we have documentation to develop the feature so that *anyone* can get something working for the customer as fast as possible. I'm sure a grad student would love to develop this feature while [developing documentation](#developing-documentation). 

If users still aren't happy with our solution then we can sit down and design a more unique solution. I would still prefer to treat the unique solution as an experiment for learning new tools to see if we can improve our core features and when we can and can't apply them. 

## Tier Responsibilities

| Tier | Location                                 | Storage & Retrieval | Security | Navigation |
| ---- | ---------------------------------------- | ------------------- | -------- | ---------- |
| DB   | Private server (cloud)                   | yes                 |          |            |
| API  | Public server (internet facing) (cloud)  | yes                 | yes      |            |
| UI   | Internet browsers (desktop and mobile devices) | yes                 | yes      | yes        |

<!--Expand on each tier.-->

## Tools
### Stack Tools

What we use to make stuff happen

* Database
    * MySQL
* API
    * Java
    * Spring-Boot
    * Hibernate
    * Spring-Security
    * Spring-Data-JPA
* UI
    * React
    * create-react-app
    * Material-UI
    * React-Router-V4

### Development Tools

How we develop our application through time into the future

* Version Control
    * Git
    * Monorepo
    * Git Town: for branching strategy
* Editors
    - Visual Studio Code (vscode)
    - Sequel Pro
* Documentation
    * Environment setup
    * How to develop core features given our current stack
* Feature toggles
* Testing
* Deployment
    * deploy features as they're ready, reducing batching
    * Flyway for automated database migrations

## Running Locally
We support Mac primarily and linux with best-efforts.

1. Open Terminal (CMD + Space, type Terminal)
2. Create or just cd into your development folder
    ```
    cd ~
    mkdir development
    cd development
    ```
3. Checkout this repository
    ```
    git clone https://github.com/cadbox1/glue-stack.git
    cd glue-stack
    ```
4. Run the setup bash script
    ```
    sh setup.sh
    ```
    You can open the bash script to find out but it:
    - installs Homebrew
    - installs Docker
    - installs Maven
    - installs Node
    - installs Yarn
5. Create a new terminal tab (CMD + t)
6. Start the MySQL database using
    ```
    docker-compose up
    ```
5. Create a new terminal tab (CMD + t)
6. The next tab will run the api (backend).
    ```
    cd api
    mvn spring-boot:run
    ```
    This will start our Spring Boot Java application which will setup the tables in our database using a tool called Flyway.
7. The next tab will run our ui (frontend) development server. You won't need this in production.
    ```
    cd ui
    yarn
    yarn start
    ```
    This will open a browser window to our application. Make sure both servers are started before your start playing with it.
8. Signup your organisation!
9. To stop any of the components hit Control + C in the tab. This is how to stop running terminal programs.

## Setup Development Tools

### Setup Sequel Pro (Database) 

1. Download [Sequel Pro](https://www.sequelpro.com/)
2. Install Sequel Pro
3. Open Sequel Pro
4. Click Standard
5. Name: localhost
6. Username: root
7. Port: 3307 (The MySQL standard is to use 3306, i've used 3307 to avoid clashes)
7. Test Connection
8. Save as Favorites
9. Connect
10. Select the glue database on the top left dropdown
11. Have a look around

### Setup Visual Studio Code (vscode)

1. Download [vscode](https://code.visualstudio.com/)
2. Download these extensions
    1. [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
    2. [Git History (git log)](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
    3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
    4. [Reactjs code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
3. Optional but recommended
    1. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
    2. [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)
    3. Fira Code font for font ligatures
        1. go to https://github.com/tonsky/FiraCode#solution
        2. click download
        3. extract the zip
        4. open the ttf folder
        5. select all the fonts then right click and select open
4. Settings (CMD + ,)
    ```
    {
        "editor.minimap.enabled": false,
        "editor.fontFamily": "Fira Code",
        "editor.fontLigatures": true,
        "editor.fontSize": 14,
        "git.confirmSync": false,
        "workbench.iconTheme": "vscode-icons",
        "editor.formatOnSave": true,
        "git.enableSmartCommit": true,
    }
    ```

## Developing Documentation

Sharing knowledge is something that I feel strongly about and its why I made this project in the first place. It's commonly overlooked because we often forget what it's like to struggle through something once we've completed it, saying how silly we are for not getting it sooner. I feel like this is especially common among developers since we are constantly learning so much so that we're almost expected to struggle through tasks all in the name of learning something new. And that's fine unless everyone else in your team is also struggling through the same tasks.

If you learn something new you should be sharing that knowledge so the rest of your team can benefit. The more we share knowledge, the more we communicate with each other, the more we understand each other, the easier it is to identify team problems and solve them collaboratively instead of solving the same problems indidually with varying results.

Documentation is one of the most efficient ways to share knowledge, let's demonstrate.

Without documentation:

1. Teacher shows learner how to do something
2. Learner learns what they can
3. Learner #2 wants to know the same thing
4. Teacher is busy, because they know stuff, so Learner #1 teaches Learner #2 what they remember
5. Learner #2 learns what they can
6. This continues in a chain of chinese whispers and forgotten details

With documentation:

1. Teacher shows learner how to do something
2. Learner does it again while documenting the process
3. Learner asks teacher to review their documentation. Pull requests are perfect for this
4. Teacher notices a discrepancy and explains further
5. Learner updates documentation and learns
6. Documentation approved
7. Learner #2 wants to know the same thing
8. Finds document either because they were aware or someone informs them
9. Learner #2 is confused about something in the document
10. Someone explains further
11. Learner #2 updates the document
12. Learner #3 benefits from Learner #2's contribution

The alternative path is Teacher writes a brief document then the process continues at step 3 with the teacher asking for review.

Documentation is code for humans; its always accessible, easy to review and easy to improve. Being easily accessible means less dependency on people which means more people can do more of the work with less variation in results. And when there are issues, documentation can be reviewed and updated to address them. So instead of the process getting worse over time because people naturally forget things it actually gets better, imagine if production code improved itself every time it ran! Less knowledgeable people actually have more to contribute because they are more aware of all the tiny details it takes to make something work whereas experienced people are often unconciously doing things. All of this creates a better culture where everyone can focus on improving process and helping the team instead of playing blame games for poor results.