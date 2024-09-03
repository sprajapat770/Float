# Stage 1: Build Stage
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./
RUN ls -lrtha
# Install all dependencies, including dev dependencies
RUN npm ci
RUN ls -lrtha
# Copy the rest of the application source code
COPY . .

RUN ls -lrtha
# Compile TypeScript to JavaScript
# RUN npm run build

# RUN ls -lrtha dist/
RUN pwd
# CMD ["npm", "run", "dev"]

# Stage 2: Production Stage
FROM node:20-alpine AS production

# Set the working directory
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=build /app/. ./

RUN pwd

RUN ls -lrtha

# RUN ls -lrtha dist/

# Install only production dependencies
RUN npm ci --omit=dev

RUN npm run build

# Start the application
CMD ["npm", "run", "dev"]
