# Using Lightweight docker image for node
FROM node:20-alpine AS base

# Setting Up Working Directory
WORKDIR /app

# Copying Package Files
COPY package*.json ./

# Installing Dependencies
RUN npm ci

# Copying Files
COPY . .

# Start Application
CMD ["npm", "run", "dev"]