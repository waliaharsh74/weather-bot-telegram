import mongoose from "mongoose";

export const connectToDb = async () => {
    try {

        const url = process.env.MONGO_URI!
        await mongoose.connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log("Connected to MongoDb")
    } catch (error) {
        console.log("Error connecting to MongoDb")

    }
}