# Using Lightweight docker image for node
FROM node:20-alpine AS base

# Setting Up Working Directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies including Vite
RUN npm install

# Copy all files to the working directory
COPY . .

# Run the build command
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000
EXPOSE 4173

# Command to run the application
CMD ["npm", "run", "preview"]