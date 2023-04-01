import mongoose from 'mongoose'
// const MONGO_URI = "mongodb://localhost:27017/" 

const connectMongo = async() =>{
    try{
        // process.env.MONGO_URI
        const { connection } = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        if(connection.readyState == 1){
            console.log("Database Connected")
        }

    }catch(errors){
        return Promise.reject(errors)
    }
}

export default connectMongo;