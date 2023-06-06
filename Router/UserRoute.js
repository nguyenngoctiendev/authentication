const express = require("express");
const userControl = require("../controler/UserControl");
const jwtMiddleware = require("../middleware/jwt_middleware")
const router = express.Router();
router.get("/user", [jwtMiddleware.isAuthentication], userControl.getListUsers);

router.post("/user/create", [jwtMiddleware.isAuthentication, jwtMiddleware.isAdmin], userControl.postUser);

router.delete("/user/delete/:userId", [jwtMiddleware.isAuthentication, jwtMiddleware.isAdmin], userControl.deleteUser)

module.exports = router;