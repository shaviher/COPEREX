import { body } from "express-validator"
import { validarCampos } from "./validar-campos.js"
import { handleErrors } from "./handleErrors.js"


export const loginValidator = [
    body("email").optional().isEmail().withMessage("Invalid email"),
    body("password").isString().withMessage("Invalid password"),
    validarCampos,
    handleErrors
]