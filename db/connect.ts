import mongoose from "mongoose";

export const connect = async() => {
    await mongoose.connect(process.env.MONGO_URI as string).then(
        () => console.log('Connected to database'),
    ).catch(
        (error) => console.error('Database connection error:', error),
    );
}