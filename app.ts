import express from "express";
import morgan from "morgan";
import { connect } from "./db/connect";
import routes from "./api/router";
require("dotenv").config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", routes);

connect();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});