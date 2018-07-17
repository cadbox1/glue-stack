# Running Locally

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
11. To stop any of the components hit `control + c` in the tab. This is how to stop running terminal programs.