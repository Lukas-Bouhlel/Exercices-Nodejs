const express = require('express');
const router = express();
const woodCtrl = require("../controllers/wood.js");
const auth = require("../middleware/auth.js");

router.get("/", auth, woodCtrl.readAll);

router.get("/:hardness", auth, woodCtrl.findByHardness);

module.exports = router;