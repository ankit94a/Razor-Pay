const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const uri = 'mongodb://localhost:27017/ROZAR-PAY-DB';
        await mongoose.connect(uri,{});
        console.log('MongoDB Connected Successfully');
    }catch (err){
        console.error('Failed to connect to MongoDB',err);
        process.exit();
    }
}
module.exports = connectDB;