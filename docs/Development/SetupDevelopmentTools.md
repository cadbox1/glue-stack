# Setup Development Tools

In this article we are preparing for the [development process for tasks](./DevelopmentProcess-Tasks.md) document by installing some extra tools.

[Running locally](./RunningLocally.md) goes through installing all the tools it takes to run our application locally. 

[Setup database connection in Sequel Pro](./SetupDatabaseConnectionInSequelPro.md).

[Setup VSCode (Visual Studio Code)](./SetupVSCode.md).

## Setup Git-Town

1. Install git-town.

   ```
   brew install git-town
   ```

2. Open terminal using mac's spotlight (Command+Space).

3. cd into your glue-stack directory.

   ```
   cd development/glue-stack
   ```

4. Run the git-town setup.

   ```
   git-town config setup
   ```

5. Select master as our main branch

6. Don't select any perennial branches.

## Setup oh-my-zsh

1. [Basic Installation](https://github.com/robbyrussell/oh-my-zsh#basic-installation)

2. Add the following to your VSCode settings.

   ```
   "terminal.integrated.shell.osx": "zsh"
   ```

