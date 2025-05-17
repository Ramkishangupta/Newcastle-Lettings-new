const dotenv = require('dotenv');
dotenv.config({ path: "./config/config.env" });
const app = require("./app");
const connectDatabase = require("./config/database");
const createSuperAdmin = require("./utils/createSuperAdmin");


//handling uncaught exception
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})

connectDatabase();
createSuperAdmin();


const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//Unhandled Promise Rejection
process.on("unhandledRejection",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
})