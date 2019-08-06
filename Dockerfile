FROM node:10.16.1-alpine as ui-build-stage
WORKDIR /app
COPY ui/package.json ui/yarn.lock ./
RUN yarn
COPY ui ./
RUN yarn build

FROM maven:3.6.1-jdk-8-alpine as api-build-stage
WORKDIR /app
COPY api/pom.xml ./
RUN mvn dependency:go-offline
COPY api ./
COPY --from=ui-build-stage /app/build /app/src/main/resources/public
RUN mvn package -DskipTests

FROM openjdk:8-jre-alpine
COPY --from=api-build-stage /app/target/api-0.0.1-SNAPSHOT.jar /app/my-app.jar
CMD exec java $JAVA_OPTS -jar /app/my-app.jar