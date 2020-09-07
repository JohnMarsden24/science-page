const express = require("express");

const router = express.Router();

const viewController = require("../controllers/viewController");

router.route("/").get(viewController.getBase);
router.route("/test").get(viewController.getTest);

module.exports = router;
