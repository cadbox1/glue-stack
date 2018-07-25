# Setup Travis CI

Following https://docs.travis-ci.com/user/getting-started/

1. Open [Travis CI in the GitHub Marketplace](https://github.com/marketplace/travis-ci).

2. Select Open Source.

3. Intall it for free.

4. Complete order and begin installation.

5. Select Install.

6. Sign in with GitHub.

7. Authorize travis-pro.

8. Select your Repo.

9. Open project in VSCode.

10. Create a new branch.

11. Create the `.travis.yml` file from [.travis.yml](https://github.com/cadbox1/glue-stack/blob/master/.travis.yml).

    We need the docker service for our testcontainers database API tests.

12. Sign in to the AWS console.

13. Go to IAM.

14. Select Users.

15. Select Add user.

    User name: travis

    Access type: Programmatic access.

16. Select Next: permissions.

17. Select Attach existing policies directly.

18. Select AmazonS3FullAccess.

19. Select AWSElasticBeanstalkFullAccess.

20. Select Next: Review.

21. Select Create user.

22. Push the branch.

23. Open the Travis CI settings for your repo.

24. Enter the access_key_id and secret_access_key as environment variables. do not show them in the logs. [https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings](https://docs.travis-ci.com/user/environment-variables/#Defining-Variables-in-Repository-Settings)

25. Check if the build passed in Travis CI.

26. Click the `build: unknown` badge next to your repo name.

27. Select Markdown.

28. Copy the code.

29. Paste it in the root `README.md`.

30. 