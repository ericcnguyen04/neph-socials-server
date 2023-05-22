import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

// Register User
export const register = async (req, res) => {
    try {
        const {
            userName,
            email,
            password,
            picturePath,
            friends
        } = req.body

        // securing password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            userName,
            email,
            password: passwordHash,
            picturePath,
            friends
        })
    } catch (err) {

    }
}