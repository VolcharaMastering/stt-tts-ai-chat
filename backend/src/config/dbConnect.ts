import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;
const MONGO_USER = process.env.MONGO_USER as string | undefined;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD as string | undefined;

if (!MONGO_URL) {
    throw new Error("Please define the MONGO_URL environment variable inside .env.local");
}

/**
 * Builds a MongoDB connection URI based on the given URL, user and password.
 * If user and password are provided, they will be inserted into the URL.
 * Otherwise, the original URL will be returned.
 * @param {string} url The MongoDB connection URL.
 * @param {string} [user] The MongoDB user name.
 * @param {string} [password] The MongoDB user password.
 * @returns {string} The modified MongoDB connection URI.
 */
function buildMongoUri(url: string, user?: string, password?: string) {
    if (user && password) {
        // Inserting the user and password into the URL if they are provided
        return url.replace("mongodb://", `mongodb://${user}:${encodeURIComponent(password)}@`);
    }
    return url;
}

async function dbConnect() {
    // Check if the connection is already established
    const mongoUri = buildMongoUri(MONGO_URL, MONGO_USER, MONGO_PASSWORD);
    try {
        // await mongoose.connect(mongoUri);
        await mongoose.connect(mongoUri, {
            connectTimeoutMS: 5000, // Тайм-аут подключения — 5 секунд
            socketTimeoutMS: 5000, // Тайм-аут для операций — 5 секунд
        });
    } catch (error) {

        throw new Error("Error while connecting to MongoDB");
    }
}

export default dbConnect;
