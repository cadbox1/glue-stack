# Glue Stack
A Multi-Tenant, Multi-User Todo application.

Organisations can sign up and manage their users' tasks.

![Screeshot](./Screenshot.png)

## Why
* A modern Relational, Java, React example application
* Solve a problem common to a lot of businesses (who you may work for)
* A small, living codebase where I can contribute and demonstrate my ideas
* Documentation for professional application development that can teach beginners
* Put together some of my favourite tools
* Make a mobile friendly application

## Concepts
* Authentication
* Sorting and Pagination
* Mobile Friendly
* Material Design
* Hamburger Menu
* Create, List and Edit flow
* Multi-tenancy: Allowing multiple organisations to share a common appication and database in SaaS style
* Development documentation
* Efficient SQL queries (no N+1 queries)

## Tools
* Database
    * MySQL
* API
    * Java
    * Spring-Boot
    * Spring-Data-JPA
    * Hibernate
    * Spring-Security
* UI
    * React
    * Create-react-app
    * React-Router-V4
    * Material-UI
* Version Control
    * Git
    * Git Town
* Editors
    * vscode
    * Sequel Pro

## Getting Started
Unfortunately, I don't have a live demo yet but I do have a bash script to make getting started fast.

Mac Instructions

1. Open Terminal (CMD + Space, type Terminal)
1. Create or just cd into your development folder
    ```
    cd ~
    mkdir development
    cd development
    ```
1. Checkout this repository
    ```
    git clone https://github.com/cadc/glue-stack.git
    cd glue-stack
    ```
1. Run the setup bash script
    ```
    sh setup.sh
    ```
    You can open the bash script to find out but it:
    - installs Homebrew
    - installs MySQL
        - creates a database called Glue
    - installs Maven
    - installs Node
    - installs Yarn
1. Create a new terminal tab (CMD + t)
1. The first tab will run the api (backend).
    ```
    cd api
    mvn spring-boot:run
    ```
    This will start our Spring Boot Java application which will setup the tables in our database using a tool called Flyway.
1. The second tab will run our ui (frontend) development server. You don't need this in production.
    ```
    cd ui
    yarn
    yarn start
    ```
    This will open a browser window to our application. Make sure both servers are started before your start playing with it.
1. Signup your organisation!

## Development Environment Setup
