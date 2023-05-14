import mongoose from "mongoose";

let isConnected = false;


export const connectTODB = async () => {
    mongoose.set('strictQuery',true) // to avoid warnings

    if(isConnected) {
        console.log('mongoDB connected')
        return;
    } 

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_promt',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;
        console.log('mongoDB connected')
    } catch(error) {
        console.log(error)
    }
}