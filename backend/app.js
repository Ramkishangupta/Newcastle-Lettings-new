const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const errorMiddleware = require("./middleware/error");

app.use(cors({
  origin: ['http://localhost:5174','https://newcastle-lettings-new.vercel.app'], 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

//route import
const propertyRoutes = require("./routes/propertyRoutes");
const adminRoutes = require("./routes/userRoutes");
const servicesRoutes = require("./routes/serviceRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

app.use("/api/v1", adminRoutes);
app.use("/api/v1", propertyRoutes);
app.use("/api/v1", servicesRoutes);
app.use("/api/v1", complaintRoutes);


//middleware for error
app.use(errorMiddleware);

module.exports = app;