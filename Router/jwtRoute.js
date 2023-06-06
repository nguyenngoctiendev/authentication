const express = require("express");
const router = express.Router();
const jwtControl = require("../controler/jwtControl")
const jwtMiddleware = require("../middleware/jwt_middleware");
router.post("/register", jwtControl.register);
router.post("/login", jwtControl.login)
router.get("/me", [jwtMiddleware.isAuthentication], jwtControl.getUserLogin);

module.exports = router;