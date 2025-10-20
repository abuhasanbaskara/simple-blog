import mongoose from 'mongoose'

const connectDB = async () => {
    // Use environment variable if available, otherwise fallback to your current connection string
    const mongoUri = process.env.MONGODB_URI || 'mongodb+srv://abuhasanbaskara_db_user:Buk4nsembaran9@cluster0.m5k6m1i.mongodb.net/simple-blog'
    
    await mongoose.connect(mongoUri)
    console.log('Connected to MongoDB')
}

export default connectDB
