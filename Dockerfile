# Use the official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy the application files into the working directory
COPY . /app

# Expose the port for the backend
EXPOSE 5000

# Install the application dependencies
RUN npm install

WORKDIR /app/client

RUN npm install

WORKDIR /app

#Run build command to create build folder
RUN npm run build

# Define the entry point for the container
CMD ["npm", "run", "dev"]