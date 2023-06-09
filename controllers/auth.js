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

        // send status of created(201) after created new user
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);

    } catch (err) {
        res.status(500).json({error: err.message});
    }
}