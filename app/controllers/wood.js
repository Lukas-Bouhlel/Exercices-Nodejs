const { Wood } = require('../models');

exports.createWood = async (req, res) => {
    try {
        const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        const newWood = await Wood.create({ 
            ...JSON.parse(req.body.datas),
            image: pathname,
        });
        res.status(201).json(newWood);
    } catch(error) {
        res.status(500).json({ 
            message: error.message || 'Could not create wood' 
        });
    }
}

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