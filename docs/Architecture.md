# Architecture

Multitenant, monolithic, 3-tier application with a MySQL database, Spring Boot HTTP API and React Single Page Application.

| Tier/Component                            | Type                            | Language   | Implementation                   |
| ----------------------------------------- | ------------------------------- | ---------- | -------------------------------- |
| DB \(Database\)                           | Relational                      | SQL        | MySQL \(pronounced "my sequel"\) |
| API \(Application Programming Interface\) | JSON over HTTP                  | Java       | Spring Boot                      |
| UI \(User Interface\)                     | SPA \(Single Page Application\) | Javascript | React                            |

## Tier Responsibilities

| Tier/Component | Location                                         | Storage & Retrieval | Security | Navigation |
| -------------- | ------------------------------------------------ | ------------------- | -------- | ---------- |
| DB             | Private server \(cloud\)                         | yes                 |          |            |
| API            | Public server \(internet facing\) \(cloud\)      | yes                 | yes      |            |
| UI             | Internet browsers \(desktop and mobile devices\) | yes                 | yes      | yes        |

It is important to "never trust the client". In our application the client refers to the ui and the reason for that is because we can't control client side code - they are free to interact with our internet facing server however they wish. That's why we have an API so that users can't directly access our database and potentially other organisations' data. I see it as a middleman between the user and the database. It is primarily in charge of enforcing the security measures we mentioned under [Managing Resources](#managing-resources) as well as preparing the data from the database. The UI may be aware of this security as well but can never be the one enforcing it.

The other thing to notice is that all components are involved in the storage and retrieval of data so all components need to support how we want our users to interact with our data.