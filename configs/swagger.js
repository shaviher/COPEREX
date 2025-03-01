import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Gestor de Empreses API",
            version: "1.0.0",
            description: "API para administrar empresass",
            contact:{
                name: "Javier Alejnadro Hernandez Ochoa",
                email: "jhernandez-2020439@gkinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3001/COPEREX/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/company/company.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}