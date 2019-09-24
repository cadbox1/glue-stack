FROM maven:3.6.1-jdk-8-alpine as dependencies
WORKDIR /app
COPY pom.xml ./
RUN mvn dependency:go-offline

FROM dependencies as packaged
WORKDIR /app
COPY ./ ./
RUN mvn package -DskipTests

FROM openjdk:8-jre-alpine
COPY --from=packaged /app/target/api-0.0.1-SNAPSHOT.jar /app/my-app.jar
CMD exec java $JAVA_OPTS -jar /app/my-app.jar