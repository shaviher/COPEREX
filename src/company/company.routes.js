import { Router } from "express"
import { registerCompany, updateCompany } from "./company.controller.js"
import { registerCompanyValidator, updateCompanyValidator } from "../middlewares/validar-company.js"


const router = Router()

router.post("/register", registerCompanyValidator, registerCompany)

router.put("/update/:cid", updateCompanyValidator, updateCompany)

export default router