const { Wood } = require('../models');
const fs = require('fs');

exports.createWood = async (req, res) => {
    try {
        const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        const newWood = await Wood.create({
            ...JSON.parse(req.body.datas),
            image: pathname,
        });
        res.status(201).json(newWood);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Could not create wood'
        });
    }
}

exports.updateWood = async (req, res) => {
    try {
        let wood = await Wood.findByPk(req.params.id);
        const pathname = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        
        if(!wood) {
            return res.status(404).json({
                error: "Wood not found"
            })
        }

        let newWood = {
            ...JSON.parse(req.body.datas)
        }

        newWood = {
            ...newWood,
            image: pathname
        };

        if (wood.image) {
            const filename = wood.image.split("/uploads/")[1];
            fs.unlink(`uploads/${filename}`, (err) => {
                if (err) {
                    console.error(`Error deleting image ${filename}: ${err.message}`);
                } else {
                    console.log(`Image ${filename} deleted`);
                }
            });
        }

        await wood.update(newWood);

        res.status(200).json(wood);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Could not update wood'
        });
    }
}

exports.readAll = async (req, res) => {
    try {
        const woods = await Wood.findAll()
        res.status(200).json(woods);
    } catch (error) {
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
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Could not find woods by hardness'
        });
    }
}