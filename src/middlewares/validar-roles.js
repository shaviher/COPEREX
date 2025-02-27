export const hasRoles = (...roles) => {
    return (req, res, next) =>{
        if(!req.user){
            return res.status(500).json({
                success: false,
                message: "Token validation is required before verifying role"
            })
        }

        if(!roles.includes(req.user.rol)){
            return res.status(401).json({
                success: false,
                message: `This service requires one of these roles: ${roles}`
            })
        }
        next()
    }
}