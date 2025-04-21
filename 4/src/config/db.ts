import mongoose from 'mongoose'

const connectDB = async(): Promise<void> => {
    try {
        const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/test'
        await mongoose.connect(mongoURI)
        console.log('mongodb连接成功')
    } catch(error) {
        console.error('mongodb连接失败:', error)
        process.exit(1)
    }
}

export default connectDB