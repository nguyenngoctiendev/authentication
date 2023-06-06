const mongoose = require("mongoose");
let isConnected = false;
async function connectToDb() {
    try {
        if (!isConnected) {
            mongoose.connect("mongodb://127.0.0.1:27017/tiendata");
            isConnected = true;
            console.log("Connected success")
        }
    }
    catch (err) {
        console.error(`err: ${err}`)
    }

}
module.exports = {
    connectToDb: connectToDb
}