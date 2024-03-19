const { User } = require('../models');

exports.signup = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ 
            message: error.message || 'Could not create user' 
        });
    }
}

exports.login = (req, res) => {
    res.send('You are login');
}