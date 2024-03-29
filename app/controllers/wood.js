const { Wood } = require('../models');
const fs = require('fs');
const { hateoasifyWood, hateoasifyCollectionWood } = require('../helpers/hateoas');
let dirname = process.env.BASE_DIR;

exports.createWood = async (req, res) => {
    try {
        const pathname = `${req.protocol}://${req.get("host")}/${dirname}/${req.file.filename}`;
        let newWood = await Wood.create({
            ...JSON.parse(req.body.datas),
            image: pathname,
        });
        newWood = {
            ...newWood.toJSON(),
            links: hateoasifyWood(newWood.id, newWood.hardness),
        };
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

        if (!wood) {
            return res.status(404).json({
                error: "Wood not found"
            })
        }

        let updateWood = {
            ...JSON.parse(req.body.datas)
        }

        if (req.file) {
            const pathname = `${req.protocol}://${req.get("host")}/${dirname}/${req.file.filename}`;

            updateWood = {
                ...updateWood,
                image: pathname
            };

            if (wood.image) {
                const filename = wood.image.split(`/${dirname}/`)[1];
                fs.unlink(`${dirname}/${filename}`, (err) => {
                    if (err) {
                        console.error(`Error deleting image ${filename}: ${err.message}`);
                    } else {
                        console.log(`Image ${filename} deleted`);
                    }
                });
            }
        }

        await wood.update(updateWood);

        wood = {
            ...wood.toJSON(),
            links: hateoasifyWood(wood.id, wood.hardness)
        };

        res.status(200).json(wood);
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Could not update wood'
        });
    }
}

exports.deleteWood = async (req, res) => {
    try {
        let wood = await Wood.findByPk(req.params.id);

        if (!wood) {
            return res.status(404).json({
                error: "Wood not found"
            })
        }

        if (wood.image) {
            const filename = wood.image.split(`/${dirname}/`)[1];
            fs.unlink(`${dirname}/${filename}`, (err) => {
                if (err) {
                    console.error(`Error deleting image ${filename}: ${err.message}`);
                } else {
                    console.log(`Image ${filename} deleted`);
                }
            });
        }

        await wood.destroy(wood);

        res.status(204).send();
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Could not delete wood'
        });
    }
}

exports.readAll = async (req, res) => {
    try {
        let woods = await Wood.findAll();
        let woodsWithLinks = woods.map(wood => {
            return {
                ...wood.toJSON(),
                links: hateoasifyWood(wood.id, wood.hardness),
            };
        });
        res.status(200).json({ woodsWithLinks, links: hateoasifyCollectionWood() });
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
        let woodsWithLinks = woods.map(wood => {
            return {
                ...wood.toJSON(),
                links: hateoasifyWood(wood.id, wood.hardness),
            };
        });
        res.status(200).json({ woodsWithLinks, links: hateoasifyCollectionWood() });
    } catch (error) {
        res.status(500).json({
            message: error.message || 'Could not find woods by hardness'
        });
    }
}