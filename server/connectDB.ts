import mongoose from "mongoose"

const mongoUrl = process.env.MONGODB_URI as string

export const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(mongoUrl)
        console.log(`\nMongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MongoDB connection FAILED \n", error)
        process.exit(1)
    }
}