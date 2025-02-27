import { Router } from "express"
import { registerCompany } from "./company.controller.js"
import { registerCompanyValidator } from "../middlewares/validar-company.js"


const router = Router()

router.post("/register", registerCompanyValidator, registerCompany)

export default router