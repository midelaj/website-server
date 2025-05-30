const express = require("express");
const { register, login } = require("./auth.controller");
const router = express.Router();

router.post("/v1/register", register);
router.post("/v1/login", login);

module.exports = router;
