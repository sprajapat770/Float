# FLOAT

## Overview

This project is a modular application designed to manage components dynamically. It supports defining database schemas using XML files, validating XML against XSD schemas, and handling database operations using Sequelize. The project structure ensures modularity and scalability by organizing core components with schemas and services. Docker is used for containerizing the application and managing dependencies.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Database Management](#database-management)
6. [Component Management](#component-management)
7. [Docker Usage](#docker-usage)
8. [Commands](#commands)
9. [Configuration](#configuration)
10. [Validation](#validation)
11. [Contributing](#contributing)
12. [License](#license)

## Project Structure

The project is organized into the following structure:

```plaintext
project-root/
│
├── core/
│   └── components/
│       ├── catalog/
│       │   ├── schema/
│       │   │   └── database.xml
│       │   ├── services/
│       │   │   └── productService.js
│       ├── User/
│       │   ├── schema/
│       │   │   └── database.xml
│       │   ├── services/
│       │   │   └── userService.js
│       ├── ... (additional components)
├── scripts/
│   ├── manageComponents.js
│   ├── generateActiveComponents.js
├── config/
│   └── database.js
├── docker-compose.yml
├── .env
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (version 14.x or above)
- Docker and Docker Compose
- npm (Node Package Manager)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-project-name.git
   cd your-project-name
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root directory and set the necessary environment variables:

   ```plaintext
   DATABASE_URL=postgres://user:password@localhost:5432/dbname
   ```

## Usage

### Database Management

This project uses Sequelize for managing database operations. Tables are defined using XML files, which are validated against XSD schemas.

#### Create and Update Tables

To create or update tables based on the XML schema files:

1. **Generate JSON from XML:**

   Convert your XML files to JSON format to use with Sequelize. The `generateJsonFromXml` function can automate this process.

2. **Run Database Synchronization:**

   ```bash
   node scripts/syncDatabase.js
   ```

### Component Management

Components can be enabled or disabled using command-line commands.

#### Enable/Disable Components

- **Generate components:**

  ```bash
    npm run manage-component component generate
  ```

- **Enable a component:**

  ```bash
  npm run manage-component catalog enable
  ```

- **Disable a component:**

  ```bash
  npm run manage-component catalog disable
  ```

## Docker Usage

Docker is used to containerize the application, ensuring a consistent environment for development and deployment. Below are the steps to set up and manage the application using Docker.

### Starting the Application

1. **Build and start containers:**

   ```bash
   docker-compose up -d
   ```

   This command builds the Docker images and starts the containers in detached mode.

2. **View Docker images:**

   ```bash
   docker images
   ```

   This lists all Docker images available on your system.

3. **Access PostgreSQL container:**

   ```bash
   docker exec -ti node-postgres-postgresdb-1 /bin/bash
   ```

   Use this command to enter the running PostgreSQL container. Replace `node-postgres-postgresdb-1` with your container name if different.

4. **Connect to PostgreSQL database using psql:**

   ```bash
   psql float_db postgres
   ```

   This connects to the PostgreSQL database inside the container.

### Stopping and Removing Containers

1. **Stop and remove all running containers:**

   ```bash
   docker-compose down
   ```

2. **Stop and remove containers, networks, and images:**

   ```bash
   docker-compose down --rmi all
   ```

   This command stops and removes all containers and also removes the associated images.

### Commands

- `node manageComponents.js <component-name> <action>`: Manage the state of components. Actions can be `enable` or `disable`.
- `node generateActiveComponents.js`: Generates or updates the `activeComponents.json` file based on the current state of components in the project.
- Docker commands listed above for managing the container environment.

### Configuration

Database and other configurations are managed using environment variables defined in the `.env` file.

### Validation

XML files are validated using XSD schemas to ensure the integrity and consistency of database definitions. The validation process is automated using scripts within the project.

### Example XML Validation Code

```javascript
const xmlValidator = require('xmllint-jsparser');

const xmlFilePath = 'path/to/database.xml';
const xsdFilePath = 'path/to/schema.xsd';

const xmlData = fs.readFileSync(xmlFilePath, 'utf8');
const xsdData = fs.readFileSync(xsdFilePath, 'utf8');

const validationResult = xmlValidator.validateXML({ xml: xmlData, schema: xsdData });

if (validationResult.errors) {
    console.error('XML Validation Errors:', validationResult.errors);
} else {
    console.log('XML is valid!');
}
```

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your fork.
4. Submit a pull request to the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

### Notes

- Ensure that the database connection details in `.env` are accurate.
- When running database scripts, make sure your PostgreSQL server is running and accessible.
- Use the Docker commands for container management as outlined above.
- https://www.bezkoder.com/docker-compose-nodejs-postgres/
---

This `README.md` now includes sections that cover the use of Docker for setting up the development environment, managing PostgreSQL, and running the application. Feel free to customize this template further based on your specific needs and project updates.


### HLD Folder
   <!-- - core
      - components
         - catalog
            - schema
               - database.xml
      - framework
   - app
      - components
      - config
   - node_modules
   - scripts
      - commands.js -->

   database services - postgress & sequelize
   docker
   components
   dependency management
   routers
   apis (rest, graphql, soap)
   authentication - jwt, session, 
   email - email-template
   access
   views - layers frontend/admin
   menu management
   admin configuration management
   elasticsearch/opensearch
   log management - winston
   cron
   monitoring
   deployment
   paymemt
   localization
   





