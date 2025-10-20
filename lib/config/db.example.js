import mongoose from 'mongoose'

const connectDB = async () => {
    // Replace with your actual MongoDB connection string
    // Format: mongodb+srv://username:password@cluster.mongodb.net/database-name
    await mongoose.connect('mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name')
    console.log('Connected to MongoDB')
}

export default connectDB
