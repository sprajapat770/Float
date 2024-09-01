const express = require("express");
const cors = require("cors");
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: 'app/config/.env' })
// const testProduct = require("./test_product");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./core/framework/database/config/connection");
// db.sequelize.sync()
//   .then(() => {
//     console.log("Synced db.");
//   })
//   .catch((err) => {
//     console.log("Failed to sync db: " + err.message);
//   });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/test-product", async (req, res) => {
  console.log("ddbfbfb");
  // await testProduct(db.sequelize, db.product);
  res.json({ message: "Welcome to bezkoder application." });
});


// Dynamically load all routes from the core/components directory
const componentsDir = path.join(__dirname, 'core/components');
fs.readdirSync(componentsDir).forEach(component => {
    const routesPath = path.join(componentsDir, component, 'routes');
    if (fs.existsSync(routesPath)) {
        fs.readdirSync(routesPath).forEach(file => {
            const route = require(path.join(routesPath, file));
            app.use(`/api/${component}`, route);
        });
    }
});

// set port, listen for requests
const PORT = process.env.NODE_LOCAL_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});