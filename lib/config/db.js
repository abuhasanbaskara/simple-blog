import mongoose from 'mongoose'

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://abuhasanbaskara_db_user:Buk4nsembaran9@cluster0.m5k6m1i.mongodb.net/simple-blog')
    console.log('Connected to MongoDB')
}

export default connectDB
