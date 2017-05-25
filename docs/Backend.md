# Backend

* install the Spring Boot CLI, [source](http://docs.spring.io/spring-boot/docs/current/reference/html/getting-started-installing-spring-boot.html#getting-started-homebrew-cli-installation)
    ```
    brew tap pivotal/tap
    brew install springboot
    ```

* init a new spring boot project, [source](https://docs.spring.io/spring-boot/docs/current/reference/html/cli-using-the-cli.html)
    ```
    spring init --dependencies=actuator,data-jpa,devtools,flyway,mysql,security,session,web api
    ```
    * spring actuator gives us some nice stats avaialbe via http
    * spring datajpa is a standard dao (data access object)
    * spring devtools gives us automatic reloads
    * flyway keeps the database in sync with our api
    * mysql is the driver for mysql
    * spring security is for authentication and protecting our endpoints
    * spring session is for token authentication
    * web is for web development - gives us tomcat 
* move .gitignore to root
* import api project into eclipse as existing maven project
* edit pom.xml
    * on the overview tab
        * change group id to com.bigHammer
        * change artifact id to api
        * change project name to api
* under src/main/java rename com.example -> com.api
* rename com.api.DemoApplication -> Application
* click command+shift+r and type start typing application.properties. make it look like this [application.properties]
* right click on Application.java -> run as -> Java Application
* flyway will connect to your empty database and configure schema_version table that it uses to keep the database in sync
* tomcat should start and you should be able to access [http://localhost:8080](http://localhost:8080) from your browser and be prompted for a username and password
    * you can log in using the username "user" and the password printed next to "Using default security password: " printed in your console.
    * you can hit one of the actuator endpoints at [http://localhost:8080/metrics](http://localhost:8080/metrics), [source](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#production-ready-endpoints)
* create db/migration under src/main/resources by right-clicking -> new -> folder (or other then folder if its not there)
* create the first create script; [V1__create.sql]
* restart the server by clicking the relaunch button at the top (has start and stop icons together)
* the database should now be setup
