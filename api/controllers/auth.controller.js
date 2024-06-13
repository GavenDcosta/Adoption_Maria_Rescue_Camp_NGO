import bcrypt from "bcrypt"
import prisma from "../lib/prisma.js"
import jwt from "jsonwebtoken"
import 'dotenv/config';


export const register = async (req, res) => {

    try{
        const { username, email, password } = req.body

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10)
    
        console.log(hashedPassword)
    
        // create new user and save 
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password:hashedPassword,
            },
        })
    
        console.log(newUser)
    
        res.status(201).json({ message: "User created successfully" })
    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Failed to Create User" })
    }
    
}
    

export const login = async (req, res) => {
    try{
        const { username, password }  = req.body

        //check if user exists
        const user = await prisma.user.findUnique({
            where:{username}
            // where:{username:username}
        })

        if(!user){
            res.status(401).json({message: "Invalid Credentials!"})
        }
    
        //check if password is correct 
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid) return res.status(401).json({message: "Invalid Credentials!"})
        
    
        //generate cookie token and send to the user 

        // res.setHeader("Set-Cookie", "test=" + "myValue").json("success")

        const age = 1000 * 60 * 60 * 24 * 7  //1 week

        const token = jwt.sign({
            id:user.id,
            isAdmin: false,
        }, 
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: age
        }
        )

        const {password: userPassword, ...userInfo} = user

        res.cookie("token", token, {
            httpOnly:true,
            secure:true,
            sameSite: 'None',
            maxAge:age,
        }).status(200).json(userInfo)

    }catch(error){
        console.log(error)
        res.status(500).json({ message: "Failed to Login" })
    }

}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({message:"User Logged Out Successfully"})
}