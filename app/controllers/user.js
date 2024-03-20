const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const password = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({
            ...req.body,
            password
        });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ 
            message: error.message || 'Could not create user' 
        });
    }
}

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const passwordMatch = await bcrypt.compare(req.body.password, user.password); 
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ 
            message: error.message || 'An error occurred during login' 
        });
    }
}