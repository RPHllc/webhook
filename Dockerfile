# The default version is used in case it is not provided
ARG NODE_VERSION=21-alpine3.19

# Use the official Node.js image with version from the argument
FROM node:${NODE_VERSION}

# Create app directory to hold the application code inside the image
WORKDIR /app

# Install Git
RUN apk update && apk add --no-cache git

# Copy package.json and package-lock.json
COPY ./package*.json /app/
# Install only the dependencies and clean the cache
RUN npm install --only=production && npm cache clean --force

# Copy the application code (except files in .dockerignore)
COPY . /app

# For extra security, add a new user and use it
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Configure Git to recognize the project directory as a safe
RUN git config --global --add safe.directory /app/project_directory

# Expose the port the app runs on
EXPOSE 80 

# Application start default (it can be overridden) 
CMD ["npm", "start"]