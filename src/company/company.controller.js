import Company from "./company.model.js"
import User from "../user/user.model.js"


export const registerCompany = async (req, res) => {
    try{
        const data = req.body
        const adminID = req.user.id

        console.log(adminID); // Verifica que el ID sea correcto

        const admin = await User.findById(adminID)

        if(!admin || admin.rol !== "ADMIN"){
            return res.status(403).json({
                success: false,
                message: "Only administrats can register companies",
                error: "Access denied"  
            })
        }

        const company = await Company.create(data)

        return res.status(201).json({
            success: true,
            message: "Company has been created",
            company: {
                name: company.name,
                description: company.description,
                email: company.email,
                phone: company.phone,
                address: company.address,
                category: company.category,
                foundationYear: company.foundationYear,
                website: company.website,
            }
        })

        
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to register company",
            error: err.message
        })
    }
}