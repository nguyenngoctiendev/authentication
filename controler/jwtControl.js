const userSchema = require("./UserSchema");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
async function register(req, res) {
    try {
        const { username, email, password, confirmpassword, gender } = req.body;
        await userSchema.create({
            username: username,
            email: email,
            password: bcrypt.hashSync(password, 10)
        })
        return res.status(200).send("Create user successfully")
    }
    catch (err) {
        console.error(`err: ${err}`)
    }

}

async function login(req, res) {
    try {
        const email = await userSchema.findOne({ email: req.body.email });
        if (!email) {
            return res.status(400).send("Wrong email or password")
        }

        const password = req.body.password;
        const isPassword = bcrypt.compareSync(password, email.password);
        if (!isPassword) {
            return res.status(400).send("Wrong email or password")
        }
        const jwtToken = jwt.sign({
            _id: email.id, username: email.username

        }, { secret: "myjwt" }, { expiresIn: 3600 })
        return res.status(200).send({
            accessToken: jwtToken

        })
    }
    catch (err) {
        console.error(`err: ${err}`)
    }
}

async function getUserLogin(req, res) {
    try {
        const userId = req.userId;
        const findUser = await userSchema.findById(userId);
        res.send({
            _id: findUser._id, username: findUser.username, email: findUser.email, role: findUser.role

        })
    }
    catch (err) {
        console.error(`err: ${err}`)
    }
}

module.exports = {
    register: register, login: login, getUserLogin: getUserLogin
}