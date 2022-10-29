import mongoose from "mongoose"

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connection successful!")
    } catch (err) {
        console.error(err)
    }
}

export default connectDb