const express = require("express");
const { authPlugins } = require("mysql2");
const router = express.Router();
const authController = require('../controllers/authController');

router.get("/", function (req, res) {
    res.send("hey it's working");
})

router.post("/register", authController.registerUser);

module.exports = router;