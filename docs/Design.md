Monolithic Design
    3-tier
    Json over http
        http methods
    API protects database

Why SQL
    oltp and olap - transactions and analytics
    tried and tested
    MySQL
        aurora (and serverless aurora)
        5 is bad
        8 or postgres would be better
            uber prefers mysql to postgres for reasons

Mappers
    largely unnecessery so far except for password encoding weirness

React Components should favour composition over inheritance for reusability
    inheritance is more dry
        can always use composition underneath

Tracking the state of requests
    created own daa fetching helper
        better than react-refetch, not sure about others
    also holds params of requests
    related to state management below

Preserving params in url with react router
    created own Link component
    related to state management
        create state holders to choose between local and url state

Flyway
    automatic database migrations

Querydsl
    static jpa queries
    comes with a url resolver
        filtering out of the box
    integrated with spring data jpa

Java API test strategy
    real database with testcontainers
    test api as a whole
    still unsure about populating database

How does the website work?
    would be a good starting point to teach frontend
        html
    explain the difference between static content and web applications

Need more high level navigation of project
    Need more explaination in what's going on in task development
        collapsed extra info for beginners
            explain functions, syntax.

Table should become a List on smaller screens
    or the name column should be sticky while you scroll horizontally
    pagination should be stuck to the bottom too

    