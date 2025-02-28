import { Router } from "express"
import { listCompany, registerCompany, updateCompany } from "./company.controller.js"
import { registerCompanyValidator, updateCompanyValidator } from "../middlewares/validar-company.js"


const router = Router()

router.post("/register", registerCompanyValidator, registerCompany)

router.put("/update/:cid", updateCompanyValidator, updateCompany)

router.get("/list-export", listCompany)

export default router