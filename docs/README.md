# Big Hammer Stack
This is the best stack I know how to write. As I learn new things i will update it.

## Goals
* A fast, documented way to get a long term solution
* A Todo App with Multi-Tenancy & Permissions
* Features:
    * Multi-Tenancy
    * Fine-grained permissions
    * Display lists of entities with aggegations
    * Display single entities
    * Display lists related to single entities
    * Create entities
    * Update entities
    * Delete entities

## The Stack
* Infrastructure - $170/month in Sydney
    * RDS Aurora t2.medium $93
        * No need for multi-AZ
    * AWS Elastic Beanstalk
        * Single EC2 t2.medium $47
        * ELB $20
    * VPC
    * SES + S3 + Cloudfront = $10
* Database
    * MySQL (Aurora)
* Backend
    * Java
    * Spring-Boot
    * Spring-Data-JPA
    * Hibernate
    * Spring-Security
* Frontend
    * React
    * React-Router-V4
    * Mobx
* Application Performance Management
    * Unknown
    * New Relic?
* Version Control
    * GitLab
    * Git Flow

