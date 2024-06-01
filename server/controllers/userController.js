const User = require('../models/User')
const jwt = require("jsonwebtoken");

const secret_key = process.env.SECRET

const createToken = (_id) => {
    return jwt.sign({_id}, secret_key, {expiresIn: '3d'})
}

const userController = {

    signupUser: async (req, res) => {
        const { email, password } = req.body
        console.log(email, password)
        try {
            const user = await User.signup(email, password)
            const token = createToken(user._id)
            return res.status(201).json({email, token});
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body
        try {
            const user = await User.login(email, password)
            const token = (createToken(user._id))
            return res.status(200).json({email, token})
        } catch (error) {
            return res.status(400).json({error: error.message})
        }
    }
}

module.exports = userController