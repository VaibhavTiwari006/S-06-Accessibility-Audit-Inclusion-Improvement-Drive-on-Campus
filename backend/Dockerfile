FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy pom.xml from backend directory (matches Render root context)
COPY backend/pom.xml ./
ENV MAVEN_OPTS="-Xmx512m -XX:+UseG1GC"
RUN mvn dependency:go-offline -B

# Copy backend source code (matches Render root context)
COPY backend/src ./src
RUN mvn package -DskipTests -B

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080

# Configure memory limits optimized for 512MB free-tier containers
ENV JAVA_TOOL_OPTIONS="-XX:+UseContainerSupport -XX:MaxRAMPercentage=75.0 -XX:+ExitOnOutOfMemoryError"
ENTRYPOINT ["java", "-jar", "app.jar"]
