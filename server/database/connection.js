const mongoose = require('mongoose');
const mongo = "mongodb+srv://harishbhalaa:harish@backend.w8koxqb.mongodb.net/"
const connectDB = async () => {
    try{
        // mongodb connection string
        const con = await mongoose.connect(mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB