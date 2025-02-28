import { category_allow } from "../../configs/category.js";

export const validarCategory = (req, res, next) => {
    const { category } = req.body

    if(!category_allow.includes(category)) {
        return res.status(400).json({
            success: false,
            message: `Category must be one of: ${category_allow.join(", ")}`
        })
    }
    next()
}