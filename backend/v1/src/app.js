const express = require("express");
const helmet = require("helmet")
const cors = require("cors");
const config = require("./config")
const loaders = require("./loaders")
// const events = require("./scripts/events")
const errorHandler = require("./middlewares/errorHandler");
config();

loaders();
const {ConfigurationRoutes} = require("./routes")

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.listen(process.env.APP_PORT, () => {
    console.log("Sunucu ayağa kalktı.")
    app.use("/configurations", ConfigurationRoutes)
    app.use((req, res, next) => {
        const error = new Error("Requested endpoint does not exists.");
        error.status = 404;
        next(error);
    })

    //Error Handler
    app.use(errorHandler)

})