# Setup AWS Cloud Infrastructure 

This document assumes you have followed [Setup AWS Account](./SetupAWSAccount.md).

## Elastic Beanstalk (API)

1. Login to the AWS Console.

2. Change to the region you want. I'm going with Sydney.

3. I'll be paraphrasing the [Launching and Connecting to an External Amazon RDS Instance in a Default VPC](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.RDS.html#rds-external-defaultvpc) document.

4. Open up RDS.

5. Create a new instance.

   Engine options: MySQL

   Check the "Only enable options eligable for RDS Free Usage Tier" checkbox if you wish.

   DB engine version: latest (5.7.21)

   DB instance class: db.t2.micro

   DB instance identifier: gluestack

   Master username: gluestack

   Master password: gluestack

   Virtual Private Cloud (VPC): Default

   Subnet group: default

   Public accessibility: Yes

   VPC security groups: Create new VPC security group

   Database name: glue

   Enhanced monitoring: Enabled

6. Select View Instance.

7. Scroll down to Details, Security and network, Security Groups and select the security group.

8. Select Inbound.

   The ip address that is already there is your current ip address, automatically populated. This may change in future depending on your internet setup. For example, it might change when you restart your modem.

9. Select Edit.

10. Select Add Rule.

   Port: 3306

   Security Group: sg-xxxxxxxx rds-launch-wizard

11. Select Save.

12. Open the Elastic Beanstalk service.

13. Create a new Application

    Application Name: Glue Stack

    Platform: Java

    ```
    cd api
    mvn package
    ```

    Application Code: (upload jar from api/target)

14. Select Configure More Options.

15. Select Modify on the Instances configuration.

    EC2 instance type: t2.micro

    EC2 security group: rds-launch-wizard

16. Select Save.

17. Select Modify on the Software configuration.

18. Under Environment properties add the following:

    RDS_HOSTNAME: (copy from the RDS tab under Connect, Endpoint)

    RDS_PORT: 3306

    RDS_DB_NAME: glue

    RDS_USERNAME: gluestack

    RDS_PASSWORD: gluestack

    These are specific so that they match the properties Elastic Beanstalk would use if it configured the RDS instance for us, which didn't work for me.

    SERVER_PORT: 5000

    This aligns the port Spring Boot listens on with the port that Elastic Beanstalk expects (from [Deploying a Spring Boot Application on AWS Using AWS Elastic Beanstalk](https://aws.amazon.com/blogs/devops/deploying-a-spring-boot-application-on-aws-using-aws-elastic-beanstalk/)).

19. Select Save.

20. Select Create app.

21. Wait a few minutes.

22. Click on the URL on the top right to see your application running live.

23. You can connect to the database instance in Sequel pro using the credentials we passed in as environemnt properties.

## Cloudfront (UI)

1. Go to S3.

2. Select Create bucket.

   Bucket name: gluestack

   Region: Sydney

3. Select Next.

4. Select Next Again.

   Leave the bucket as private

5. Select Next.

6. Select Create bucket.

7. Select the gluestack bucket.
8. Select Permissions.
9. Select Bucket Policy.
10. Paste the following.
    
    ```
    {
        "Id": "Policy1532945968718",
        "Version": "2012-10-17",
        "Statement": [
            {
            "Sid": "Stmt1532945962582",
            "Action": [
                "s3:GetObject"
            ],
            "Effect": "Allow",
            "Resource": "arn:aws:s3:::gluestack/*",
            "Principal": "*"
            }
        ]
    }
    ```

11. Select Save.

12. Build the ui.

    ```
    cd ui
    yarn buld
    ```

13. Upload the contents of the `ui/build/`.

14. Select Next.

   Manage public permissions: Grant public read access to this bucket

12. Select Next.

13. Select Upload.

14. Select Properties.

15. Select Static website hosting.

16. Select Use this bucket to host a website.

    Index document: index.html

17. Copy the Endpoint.

18. Select Save.

19. Go to CloudFront.

20. Select Create distribution.

21. Select Get Started under the Web distribution.

    Origin Domain Name: (endpoint you copied from s3)

    Viewer Protocol Policy: Redirect HTTP to HTTPS

22. Select Create Distribution.

23. Select the distribution.

24. Select Origins.

25. Select Create Origin.

    Origin Domain Name: (Elastic Beanstalk domain)

26. Select Behaviours.

27. Select Create.

28. Select Create Behaviours.

    Path pattern api/*

    Origin: Custom-gluestack-env

    Viewer Protocol Policy: Redirect HTTP to HTTPS 

    Allowed HTTP Methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE

    Cache Based on Selected Request Headers: All

    Min, Max, Default TTL: 0

    Query String Forwarding and Caching: Forward all, cache based on all

    Compress Objects Automatically: Yes

29. Select Create.

30. Select General.

31. Go to the Domain and see it all working!