`use strict`

import express from "express"
import cors from "cors"
import morgan from "morgan"
import { dbConnection  } from "./mongo.js"
import helmet from "helmet"


const middlewares = (app) => {
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const connectDB = async () => {
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err} `)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        connectDB()
        const port = process.env.PORT || 3001;
        app.listen(port, () => {
            console.log(`Server running on port ${port} matutina`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};