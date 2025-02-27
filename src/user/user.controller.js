import User from "./user.model.js"
import { verify } from "argon2"
import { generateJWT } from "../helpers/generate-jwt.js"



export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Invalid credentials",
                error: "The username or email entered does not exist"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Invalid credentials",
                error: "Incorrect password"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token
            }
        })

    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}