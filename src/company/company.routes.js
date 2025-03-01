import { Router } from "express"
import { listCompany, registerCompany, updateCompany } from "./company.controller.js"
import { registerCompanyValidator, updateCompanyValidator } from "../middlewares/validar-company.js"

const router = Router()

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", registerCompanyValidator, registerCompany)

/**
 * @swagger
 * /update/{cid}:
 *   put:
 *     summary: Update an existing company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Company updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Company not found
 */
router.put("/update/:cid", updateCompanyValidator, updateCompany)

/**
 * @swagger
 * /list-export:
 *   get:
 *     summary: List all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: List of companies
 *       500:
 *         description: Internal server error
 */
router.get("/list-export", listCompany)

export default router