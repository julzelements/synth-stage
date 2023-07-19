# Use an official Node runtime as the parent image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies inside the Docker image
RUN npm install

# Copy the rest of the application code to the working directory
COPY ./server ./server

# Make port 8080 available outside the container
EXPOSE 8080

# Define the command that runs your app
CMD [ "node", "./server/server.js" ]
