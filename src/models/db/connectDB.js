import mongoose from 'mongoose'
import { uri } from './dbConfig'

const MONGODB_URI = uri
console.log("env info: ", process.env.MONGO_USERNAME, process.env.MONGO_PASSWORD)
if (!MONGODB_URI) {
    console.log("mongodb uri not provided")
}

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // Timeout after 5s instead of 30s
        })
        console.log('MongoDB Connected...')
    } catch (err) {
        console.error('Error Connecting to Database: ', err.message)
        process.exit(1)
    }
}

export default connectDB