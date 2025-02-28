import Company from "./company.model.js"
import User from "../user/user.model.js"
import ExcelJS from "exceljs"
import fs from 'fs';
import path from 'path';


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

export const updateCompany = async (req, res) => {
    try{
        const { cid } = req.params 
        const data = req.body
        const adminID = req.user.id

        const admin = await User.findById(adminID)

        if (!admin || admin.rol !== "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Only administrats can update company",
                error: "Access denied"
            })
        }

        const company = await Company.findByIdAndUpdate(cid, data, { new: true })

        if(!company) {
            return res.status(404).json({
                success: false,
                message: "Company not found",
                error: err.message
            })
        }

        return res.status(200).json({
            success: true,
            message: "Company has been updated",
            company: {
                name: company.name,
                description: company.description,
                category: company.category,
                impactLevel: company.impactLevel,
                foundationYear: company.foundationYear,
                email: company.email,
                phone: company.phone,
                address: company.address,
                website: company.website
            }
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to update Company",
            error: err.message
        })
    }
}

export const listCompany = async (req, res) => {
    try{
        const { sort, category, minYears, maxYears } = req.query
        let sortOptions = {}
        let queryFilters = {} 

         // Filtros de categoría
         if (category) {
            queryFilters.category = category
        }

        // Filtro de años de trayectoria
        if (minYears || maxYears) {
            const currentYear = new Date().getFullYear()
            const minFoundationYear = minYears ? currentYear - minYears : 1900
            const maxFoundationYear = maxYears ? currentYear - maxYears : currentYear
            queryFilters.foundationYear = { $gte: minFoundationYear, $lte: maxFoundationYear }
        }

        if(sort === "A-Z") sortOptions.name = 1
        if(sort === "Z-A") sortOptions.name = -1

        const company = await Company.find(queryFilters).sort(sortOptions)

        const workbook = new ExcelJS.Workbook()
        const worksheet = workbook.addWorksheet(`Company`)

        worksheet.columns = [
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Description', key: 'description', width: 30 },
            { header: 'Category', key: 'category', width: 30 },
            { header: 'Impact Level', key: 'impactLevel', width: 20 },
            { header: 'Foundation Year', key: 'foundationYear', width: 20 },
            { header: 'Email', key: 'email', width: 50 },
            { header: `Phone`, key: `phone`, width: 50},
            { header: `Address`, key: `address`, width: 50},
            { header: `Website`, key: `website`, width: 50}
        ]

        company.forEach(company => {
            worksheet.addRow(company)
        })

        const directoryPath  = path.join(path.resolve(), `excel`)
        if(!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath)
        }

        const now = new Date()
        const fecha = now.toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0]
        const filePath = path.join(directoryPath, `company_${fecha}.xlsx`)

        await workbook.xlsx.writeFile(filePath)

        return res.status(200).json({
            success: true,
            message: "company listed successfully",
            company
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Failed to list company",
            error: err.message
        })
    }
}