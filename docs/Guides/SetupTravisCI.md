# Setup Travis CI

Oh wow was this hard. That was probably in part due to me not wanting to do this but CI is very standard in the industry so this really had to be done. Unfortunately I didn't really learn anything more about CI while setting up Travis, I mainly learned about setting up Travis explictly and how painful it was.

Its really easy to get a basic build and test to make sure the branch doesn't fail but the automatic deploy was a bit harder. 

After reaching the halfway point I thought about changing to either Circle CI or Buddy.works but I thought that would be harder than just finishing off travis. Travis is cool because it gives you concurrent jobs for free but that's only for open source projects. This is a bit of a weird area for this project because I want to teach everyone software development; open source and closed source, but at the same time its nice to reap the rewards offered by services for open source projects. GitLab has its own CI for free for private projects so that is pretty dam tasty if you go closed source because the private repo and CI is free. I don't think I'm willing to move this project over to GitLab since GitHub is largely the open source standard.

Problems faced:
- you need to specify the pro option on travis cli even though we're not pro because they changed the domain for newer open source accounts to the same domain as the pro.
- Repoistory Environment Variables can't be used in your .travis.yml file.
- Travis cli encrypt overwrites encrypted variables by default instead of appending.
- There's nothing on the environment variables page about how to use the variables in the .travis.yml file.
- Testcontainers uses travis internally apparently but they don't have docs for it.
- You have to specify not to delete the built files you want to deploy in the deploy section.

Following https://docs.travis-ci.com/user/getting-started/

1. Open [Travis CI in the GitHub Marketplace](https://github.com/marketplace/travis-ci).

2. Select Open Source.

3. Intall it for free.

4. Complete order and begin installation.

5. Select Install.

6. Sign in with GitHub.

7. Authorize travis-pro.

8. Select your Repo.
9. Select More Options, Settings.
10. Turn off Build pushed branches.

11. Open project in VSCode.

12. Create a new branch.

13. Create the `.travis.yml` file from [.travis.yml](https://github.com/cadbox1/glue-stack/blob/master/.travis.yml).

    We need the docker service for our testcontainers database API tests.

14. Sign in to the AWS console.

15. Go to IAM.

16. Select Users.

17. Select Add user.

    User name: travis

    Access type: Programmatic access.

18. Select Next: permissions.

19. Select Attach existing policies directly.

20. Select AmazonS3FullAccess.

21. Select AWSElasticBeanstalkFullAccess.

22. Select Next: Review.

23. Select Create user.
24. Keep the page open so we can copy the credentials into our travis file.
25. Open the root of our project in VSCode.
26. Install the Travis CLI
    
    ```
    brew install travis
    ```

27. Login into your travis account using the CLI
    
    ```
    travis login --pro
    ```
    The pro is important because travis changed their domain for free accounts to the pro domain.

28. Encrypt your credentials. This is done using a private key for your account that only travis knows. Its bad practice to check in credentials into source control. In fact, there are bots that are constantly scanning GitHub for credentials and if they find some they automatically spin up instances, usually to mine bitcoin, and you pay for it.
    
    ```
    travis encrypt access_key_id=YOUR_ACCESS_KEY --add env
    travis encrypt secret_access_key=YOUR_SECRET_KEY --add --append env
    ```
 
29. Commit your work.
30. Push the branch.

31. Check if the build passed in Travis CI.

32. Click the `build: unknown` badge next to your repo name.

33. Select Markdown.

34. Copy the code.

35. Paste it in the root `README.md`.