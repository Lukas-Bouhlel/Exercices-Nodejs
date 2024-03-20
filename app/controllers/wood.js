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

exports.findByHardness = async (req, res) => {
    const { hardness } = req.params;
    try {
        const woods = await Wood.findAll({ where: { hardness } });
        res.status(200).json(woods);
    } catch(error) {
        res.status(500).json({ 
            message: error.message || 'Could not find woods by hardness' 
        });
    }
}