const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const errorMiddleware = require("./middleware/error");

app.use(cors({
  origin: 'http://localhost:5174', 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//route import
const propertyRoutes = require("./routes/propertyRoutes");
const adminRoutes = require("./routes/userRoutes");

app.use("/api/v1", adminRoutes);
app.use("/api/v1", propertyRoutes);


//middleware for error
app.use(errorMiddleware);

module.exports = app;