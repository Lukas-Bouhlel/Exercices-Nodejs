const { Wood } = require('../models');

exports.readAll = async (req, res) => {
    try {
        const woods = await Wood.findAll()
        res.status(200).json(woods);
    } catch(error) {
        res.status(500).json({ 
            message: error.message || 'Could not read all wood' 
        });
    }
}