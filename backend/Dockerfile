FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Install Maven directly instead of relying on mvnw
RUN apk add --no-cache maven

COPY pom.xml ./
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
