import { hash } from "argon2";
import User from "../src/user/user.model.js"

export const adminCreate = async() => {
    
    const dataAdmin = {
        name: "Braulio",
        lastname: "Echeverria",
        username: "jbraulio85",
        email: "becheverria@gmail.com",
        password: "admin123",
        rol: "ADMIN"
    }

    try{
        const adminExist = await User.findOne({ rol: "ADMIN" })

        if(adminExist) {
            console.log("There is an administrator in the database")
            return
        }
       
        dataAdmin.password = await hash(dataAdmin.password)

        await User.create(dataAdmin)

        // Log para registrar la fecha y hora cuando se crea el admin
        const now = new Date();
        console.log(`[${now.toISOString()}] Default administrator successfully created with mail ${dataAdmin.email}`);

    }catch(err){
        console.error("Error creating administrator:", err.message)
    }
}