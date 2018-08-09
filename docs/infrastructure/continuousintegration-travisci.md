# Continuous Integration \(CI\): Travis CI

[Continuous Integration vs. Continuous Delivery vs. Continuous Deployment](https://stackoverflow.com/questions/28608015/continuous-integration-vs-continuous-delivery-vs-continuous-deployment)

It seems the definition is rather subjective so let me be explict about what glue-stack does: 1. Tests are run when you create your pull request \(pr\) into master and you can't merge until they pass. 2. When you've merged your code into master, it will be deployed to production.

I guess that would be Continuous Deployment?

Our pipeline \(process\) looks like this: 1. Run the ui and api tests in parallel. 2. When they are both complete and pass, deploy the api. 1. The api is deployed to AWS elastic beanstalk which is AWS' PaaS \(platform as a service\) offering. It can be configured to do rolling deploys for zero downtime deploys. 2. When the new api version starts up, [Flyway](https://flywaydb.org/) automatically runs database change scripts if required. 3. When the api is deployed, deploy the ui.

## Execution

Oh wow was this hard. That was probably in part due to me not wanting to do this but CI is very standard in the industry so it really had to be done and the final product is pretty cool. Unfortunately I didn't really learn anything more about CI while setting up Travis, I mainly learned about setting up Travis. And how painful it is.

Its really easy to get a basic build and test to make sure the branch doesn't fail but the automatic deploy was a bit harder.

### Alternatives

After reaching the halfway point I thought about changing to either Circle CI or Buddy.works but I thought that would be harder than just finishing off travis. Travis is cool because it gives you concurrent jobs for free but that's only for open source projects.

This is a bit of a weird area for this project because I want to teach everyone software development; open source and closed source, but at the same time its nice to reap the rewards offered by services for open source projects. GitLab has its own CI for free for private projects so that is pretty dam tasty if you go closed source because the private repo and CI is free. I don't think I'm willing to move this project over to GitLab since GitHub is largely the open source standard but if I needed closed source I would be looking at them.

### Problems

* you need to specify the pro option on travis cli even though we're not pro because they changed the domain for newer open source accounts to the same domain as the pro. [Open source on travis.com](https://docs.travis-ci.com/user/open-source-on-travis-ci-com/#Existing-Open-Source-Repositories-on-travis-ci.org)
* Repoistory Environment Variables can't be used in your .travis.yml file. [Travis CI - Using repository environment variables in .travis.yml](https://stackoverflow.com/questions/33735992/travis-ci-using-repository-environment-variables-in-travis-yml)
* Travis cli encrypt overwrites encrypted variables by default instead of appending.
* There's nothing on the environment variables page about how to use the variables in the .travis.yml file. [Environment Variables](https://docs.travis-ci.com/user/environment-variables/)
* Testcontainers uses travis internally apparently but they don't have docs for it.
* You have to specify not to delete the built files you want to deploy in the deploy section.
* Only build prs and master branch [https://stackoverflow.com/questions/31882306/how-to-configure-travis-ci-to-build-pull-requests-merges-to-master-w-o-redunda\#31882307](https://stackoverflow.com/questions/31882306/how-to-configure-travis-ci-to-build-pull-requests-merges-to-master-w-o-redunda#31882307)

### Method

Following [https://docs.travis-ci.com/user/getting-started/](https://docs.travis-ci.com/user/getting-started/)

1. Open [Travis CI in the GitHub Marketplace](https://github.com/marketplace/travis-ci).
2. Select Open Source.
3. Intall it for free.
4. Complete order and begin installation.
5. Select Install.
6. Sign in with GitHub.
7. Authorize travis-pro.
8. Open project in VSCode.
9. Create a new branch.
10. Create the `.travis.yml` file from [.travis.yml](https://github.com/cadbox1/glue-stack/blob/master/.travis.yml).

    We need the docker service for our testcontainers database API tests.

11. Sign in to the AWS console.
12. Go to IAM.
13. Select Users.
14. Select Add user.

    User name: travis

    Access type: Programmatic access.

15. Select Next: permissions.
16. Select Attach existing policies directly.
17. Select AmazonS3FullAccess.
18. Select AWSElasticBeanstalkFullAccess.
19. Select Next: Review.
20. Select Create user.
21. Keep the page open so we can copy the credentials into our travis file.
22. Open the root of our project in VSCode.
23. Install the Travis CLI

    ```text
    brew install travis
    ```

24. Login into your travis account using the CLI

    ```text
    travis login --pro
    ```

    The pro is important because travis changed their domain for free accounts to the pro domain.

25. Encrypt your credentials. This is done using a private key for your account that only travis knows. Its bad practice to check in credentials into source control. In fact, there are bots that are constantly scanning GitHub for credentials and if they find some they automatically spin up instances, usually to mine bitcoin, and you pay for it.

    ```text
    travis encrypt access_key_id=YOUR_ACCESS_KEY --add env
    travis encrypt secret_access_key=YOUR_SECRET_KEY --add --append env
    ```

26. Commit your work.
27. Push the branch.
28. Check if the build passed in Travis CI.
29. Click the `build: unknown` badge next to your repo name.
30. Select Markdown.
31. Copy the code.
32. Paste it in the root `README.md`.

