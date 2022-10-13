const mongoose = require("mongoose")

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connection successful!")
    } catch (err) {
        console.error(err)
    }
}

module.exports = connectDb