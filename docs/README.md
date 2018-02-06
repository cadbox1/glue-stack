# Glue Stack
A multi-tenant, multi-user todo application where organisations can sign up and manage their users' tasks.

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/glue-stack)
[![Waffle.io - Columns and their card count](https://badge.waffle.io/cadbox1/glue-stack.png?columns=all)](https://waffle.io/cadbox1/glue-stack?utm_source=badge)

![Screeshot](./Screenshot.png)

## Why
* A modern Relational, Java, React example application
* Solve a problem common to a lot of businesses (who might pay you)
* A small, living codebase where I can contribute and demonstrate my ideas
* Documentation for professional application development that can teach beginners
* Put together some of my favourite tools
* Make a mobile friendly application

## Concepts
* In-Depth Development documentation
* Authentication
* Create, List and Edit flow
* Sorting and Pagination
* Mobile Friendly
* Multi-tenancy: Allowing multiple organisations to share a common appication and database in SaaS style

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
    * Visual Studio Code (vscode)
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
1. The second tab will run our ui (frontend) development server. You won't need this in production.
    ```
    cd ui
    yarn
    yarn start
    ```
    This will open a browser window to our application. Make sure both servers are started before your start playing with it.
1. Signup your organisation!

## Development Environment Setup

1. Sequel Pro (Database) 
    1. Download [Sequel Pro](https://www.sequelpro.com/)
    1. Install Sequel Pro
    1. Open Sequel Pro
    1. Select Socket as the Connection type
    1. Name: localhost
    1. Username: root
    1. Test Connection
    1. Save as Favorites
    1. Connect
    1. Select the Glue database on the top left dropdown
    1. Have a look around
1. Visual Studio Code (vscode)
    1. Download [vscode](https://code.visualstudio.com/)
    1. Download these extensions
        1. [Java Extension Pack](https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack)
        1. [Git History (git log)](https://marketplace.visualstudio.com/items?itemName=donjayamanne.githistory)
        1. [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
        1. [Reactjs code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.ReactSnippets)
    1. Optional but recommended
        1. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
        1. [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)
        1. Fira Code font for font ligatures
            1. go to https://github.com/tonsky/FiraCode#solution
            1. click download
            1. extract the zip
            1. open the ttf folder
            1. select all the fonts then right click and select open
    1. Settings (CMD + ,)
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
