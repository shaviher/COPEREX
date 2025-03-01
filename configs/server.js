`use strict`

import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import { dbConnection  } from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import companyRoutes from "../src/company/company.routes.js"
import { adminCreate } from "./admin.js";
import { swaggerDocs, swaggerUi } from "./swagger.js"



const middlewares = (app) => {
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
}

const routes = (app) => {
    app.use("/COPEREX/v1/auth", authRoutes)
    app.use("/COPEREX/v1/company", companyRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
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
        adminCreate()
        routes(app)
        const port = process.env.PORT || 3001;
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};