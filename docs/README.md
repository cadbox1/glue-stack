# Glue Stack

My favourite tools and practises glued together to make a multi-tenant todo application where organisations can sign up and manage their users' tasks.

If you're reading this on GitHub, then try our [GitBook](https://cadbox1.gitbook.io/glue-stack/).

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/glue-stack)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/cadbox1/glue-stack.svg?columns=all)](https://waffle.io/cadbox1/glue-stack)

![Screeshot](./Screenshot.png)

## Table of Contents

* [Running Locally](#running-locally)
* [Why](#why)
* [Architecture](#architecture)
* [Application Features](#application-features)
* [Common Features](#common-features)
  * [Managing Resources](#managing-resources)
* [Tier Responsibilities](#tier-responsibilities)
* [Tools](#tools)
  * [Stack Tools](#stack-tools)
  * [Development Tools](#development-tools)
* [Setup Development Tools](#setup-development-tools)
  * [Setup Sequel Pro \(Database\)](#setup-sequel-pro-database)
  * [Setup Visual Studio Code \(vscode\)](#setup-visual-studio-code-vscode)
* [Developing Documentation](#developing-documentation)

## Running Locally

We support Mac primarily and linux with best-efforts.

1. Open Terminal \(CMD + Space, type Terminal\)
2. Create or just cd into your development folder

   ```text
   cd ~
   mkdir development
   cd development
   ```

3. Checkout this repository

   ```text
   git clone https://github.com/cadbox1/glue-stack.git
   cd glue-stack
   ```

4. Run the setup bash script

   ```text
   sh setup.sh
   ```

   You can open the bash script to find out but it:

   * installs Homebrew
   * installs Docker
   * installs Maven
   * installs Node
   * installs Yarn

5. Create a new terminal tab \(CMD + t\)
6. Start the MySQL database using

   ```text
   docker-compose up
   ```

7. Create a new terminal tab \(CMD + t\)
8. The next tab will run the api \(backend\).

   ```text
   cd api
   mvn spring-boot:run
   ```

   This will start our Spring Boot Java application which will setup the tables in our database using a tool called Flyway.

9. The next tab will run our ui \(frontend\) development server. You won't need this in production.

   ```text
   cd ui
   yarn
   yarn start
   ```

   This will open a browser window to our application. Make sure both servers are started before your start playing with it.

10. Signup your organisation!
11. To stop any of the components hit Control + C in the tab. This is how to stop running terminal programs.

## Why

* Share how I currently build web applications
* Understand how my favourite tools and practices fit together in a real application
* Establish my standard to compare new tools and processes with
* Establish some common web application concepts and how to build them
* Demonstrate my idea of documentation

## Architecture

Multitenant, monolithic, 3-tier application with a MySQL database, Spring Boot HTTP API and React Single Page Application.

| Tier/Component | Type | Language | Implementation |
| --- | --- | --- | --- |
| DB \(Database\) | Relational | SQL | MySQL \(pronounced "my sequel"\) |
| API \(Application Programming Interface\) | HTTP with JSON | Java | Spring Boot |
| UI \(User Interface\) | SPA \(Single Page Application\) | Javascript | React |

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

* Operations
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
* Mobile friendly: all operations must work across devices

These are our core features that will be used over and over again in our app. Managing your personal tasks, organisation's users and organisation's tasks will all follow the same `Managing Resources` pattern. Even signup is a Create operation.

In the future users may want comments on tasks. We could sit down and have a think about the best tool for the job, with maybe a nosql database, research what other companies are doing with comments, should they be nested or flat and come up with a solution. But I would prefer to apply our `Managing Resources` framework to get an MVP \(minimum viable product\) to users as fast as possible. It should be trivial for anyone to develop not because its 'easy' \(which depends on your perspective\) but because we've designed our application and our documentation specifically to make it easy. If users still aren't happy with our solution then we can sit down and design a more unique solution.

## Tier Responsibilities

| Tier/Component | Location | Storage & Retrieval | Security | Navigation |
| --- | --- | --- | --- | --- |
| DB | Private server \(cloud\) | yes |  |  |
| API | Public server \(internet facing\) \(cloud\) | yes | yes |  |
| UI | Internet browsers \(desktop and mobile devices\) | yes | yes | yes |

It is important to "never trust the client". In our application the client refers to the ui and the reason for that is because we can't control client side code - they are free to interact with our internet facing server however they wish. That's why we have an API so that users can't directly access our database and potentially other organisations' data. I see it as a middleman between the user and the database. It is primarily in charge of enforcing the security measures we mentioned under [Managing Resources](#managing-resources) as well as preparing the data from the database. The UI may be aware of this security as well but can never be the one enforcing it.

The other thing to notice is that all components are involved in the storage and retrieval of data so all components need to support how we want our users to interact with our data.

## Tools

### Stack Tools

Tools that make our application work.

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

Tools that we use to develop our application over time.

* Version Control
  * Git
  * Monorepo
  * Git Town: for branching strategy
* Editors
  * Visual Studio Code \(vscode\)
  * Sequel Pro
* Documentation
  * Environment setup
  * How to develop core features given our current stack
* Feature toggles
* Testing
* Deployment
  * Deploy features as they're ready, reducing batching
  * Flyway for automated database migrations

## Setup Development Tools

### Setup Sequel Pro \(Database\)

1. Download [Sequel Pro](https://www.sequelpro.com/)
2. Install Sequel Pro
3. Open Sequel Pro
4. Click Standard
5. Name: localhost
6. Username: root
7. Port: 3307 \(The MySQL standard is to use 3306, i've used 3307 to avoid clashes\)
8. Test Connection
9. Save as Favorites
10. Connect
11. Select the glue database on the top left dropdown
12. Have a look around

### Setup Visual Studio Code \(vscode\)

1. Download [vscode](https://code.visualstudio.com/)
2. Download these extensions
   1. [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
   2. [Git History \(git log\)](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
   3. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
   4. [Reactjs code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
3. Optional but recommended
   1. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
   2. [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)
   3. Fira Code font for font ligatures
      1. go to [https://github.com/tonsky/FiraCode\#solution](https://github.com/tonsky/FiraCode#solution)
      2. click download
      3. extract the zip
      4. open the ttf folder
      5. select all the fonts then right click and select open
4. Settings \(CMD + ,\)

   ```text
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

### Setup Flyway \(less important, for database development\)

1. Install Flyway CLI \(command line interface\)

   ```text
   brew install flyway
   ```

## Developing Documentation

Sharing knowledge is something that I feel strongly about and its why I made this project in the first place. It's commonly overlooked because we often forget what it's like to struggle through something once we've completed it, saying how silly we are for not getting it sooner. I feel like this is especially common among developers since we are constantly learning so much so that we're almost expected to struggle through tasks all in the name of learning something new. And that's fine, unless everyone else in your team is also struggling through the same stuff.

If you learn something new you should be sharing that knowledge so the rest of your team can benefit. The more we share knowledge, the more we communicate with each other, the more we understand each other, the easier it is to identify team problems and solve them collaboratively instead of solving the same problems indidually with varying results.

Documentation is one of the most efficient ways to share knowledge, let's demonstrate.

Without documentation:

1. Teacher shows learner how to do something
2. Learner learns what they can
3. Learner \#2 wants to know the same thing
4. Teacher is busy, because they know stuff, so Learner \#1 teaches Learner \#2 what they remember
5. Learner \#2 learns what they can
6. This continues in a chain of chinese whispers and forgotten details

With documentation:

1. Teacher shows learner how to do something
2. Learner does it again while documenting the process
3. Learner asks teacher to review their documentation. Pull requests are perfect for this
4. Teacher notices a discrepancy and explains further
5. Learner updates documentation and learns
6. Documentation approved
7. Learner \#2 wants to know the same thing
8. Finds document either because they were aware or someone informs them
9. Learner \#2 is confused about something in the document
10. Someone explains further
11. Learner \#2 updates the document
12. Learner \#3 benefits from Learner \#2's contribution

The alternative path is Teacher writes a brief document then the process continues at step 3 with the teacher asking for review.

Documentation is code for humans; its always accessible, easy to review and easy to improve. Being easily accessible means less dependency on people which means more people can do more of the work with less variation in results. And when there are issues, documentation can be reviewed and updated to address them. So instead of the process getting worse over time because people naturally forget things it actually gets better, imagine if production code improved itself every time it ran! Less knowledgeable people actually have more to contribute because they are more aware of all the tiny details it takes to make something work whereas experienced people are often unconciously doing things. All of this creates a better culture where everyone can focus on improving process and helping the team instead of playing blame games for poor results.

Checkout our [GitBook](https://cadbox1.gitbook.io/glue-stack/) for our documentation.
