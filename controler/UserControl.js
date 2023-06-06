const UserSchema = require("./UserSchema");
const bcrypt = require("bcrypt");

async function getListUsers(req, res) {
    try {
        const users = await UserSchema.find();
        return res.status(200).send(users);
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send("Internal Server Error");
    }
}

async function postUser(req, res) {
    try {
        const { username, email, password, gender } = req.body;
        await UserSchema.create({
            username: username,
            password: bcrypt.hashSync(password, 10),
            email: email,
            gender: gender
        });
        return res.status(200).send("Create user successfully");
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send("Internal Server Error");
    }
}

async function deleteUser(req, res) {
    try {
        const userId = req.params.userId;
        await UserSchema.findByIdAndDelete(userId);
        return res.status(200).send("Delete user successfully");
    } catch (err) {
        console.error(`Error: ${err}`);
        return res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getListUsers: getListUsers,
    postUser: postUser,
    deleteUser: deleteUser
};
