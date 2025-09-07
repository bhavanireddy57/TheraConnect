import mongoose from "mongoose";

export const Connection = async () => {
    const URL = process.env.MONGO_URL; // or MONGO_URL — whichever you use in .env

    try {
        await mongoose.connect(URL); // ✅ no deprecated options
        console.log('Database connected successfully!!!');
    } catch (error) {
        console.log('Error while connecting with the database', error.message);
    }
};

export default Connection;
