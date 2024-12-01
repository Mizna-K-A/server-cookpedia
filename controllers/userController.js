const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req, res) => {
    console.log("Inside registerController");
    const { username, email, password } = req.body

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(406).json("User Already exist!!! Please Login")
        } else {
            const encryptPassword = await bcrypt.hash(password, 10)
            const newUser = new users({
                username, email, password: encryptPassword, profilePic: ""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
    } catch (err) {
        res.status(401).json(err)
    }

}

// login
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            let isMatch = await bcrypt.compare(password, existingUser.password)
            if (existingUser.password == password || isMatch) {
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_PASSWORD)
                res.status(200).json({
                    user: existingUser, token
                })
            } else {
                res.status(404).json("Invaild Password")
            }
        } else {
            res.status(401).json("Invalid email")
        }

    } catch (err) {

    }

}

// get all users
exports.getAllUsersController = async(req,res)=>{
    console.log("Inside getAllUsersController");
    try {
        const allUsers = await users.find().skip(1)
        res.status(200).json(allUsers)
    } catch (err) {
        res.status(401).json(err)
    }
}

// profile updation logic
exports.editProfileController = async (req,res)=>{
    console.log("Inside editProfileController");
    const id = req.userId
    const {profilePic} = req.body
    try {
        const existingUser = await users.findById({_id:id})
        existingUser.profilePic = profilePic
        await existingUser.save()
        res.status(200).json(existingUser)
    } catch (err) {
        res.status(401).json(err)
    }
}