import { body } from "express-validator"
import { validarCampos } from "./validar-campos.js"
import { handleErrors } from "./handleErrors.js"
import { validarCategory } from "./validar-category.js"
import { validateJWT } from "./validate-jwt.js"


export const registerCompanyValidator = [
    body("name").notEmpty().withMessage("The name is requered"),
    body("description").isLength({ max: 150 }).withMessage("Description cannot exceed 150 characters"),
    body("email").isEmail().withMessage("The email is requered"),
    body("phone").isNumeric().withMessage("The phone is requered"),
    body("address").notEmpty().withMessage("The address is requered"),
    validarCategory,
    body("foundationYear").isNumeric().withMessage("The foundation year is requered"),
    body("website").notEmpty().withMessage("The website is requered"),
    validarCampos, 
    validateJWT,
    handleErrors
]

export const updateCompanyValidator = [
    body("name").notEmpty().withMessage("The name is requered"),
    body("description").isLength({ max: 150 }).withMessage("Description cannot exceed 150 characters"),
    body("email").isEmail().withMessage("The email is requered"),
    body("phone").isNumeric().withMessage("The phone is requered"),
    body("address").notEmpty().withMessage("The address is requered"),
    validarCategory,
    body("foundationYear").isNumeric().withMessage("The foundation year is requered"),
    body("website").notEmpty().withMessage("The website is requered"),
    validarCampos, 
    validateJWT,
    handleErrors
]