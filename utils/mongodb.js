import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { con: null, promise: null };
}

async function dbConnect() {
  if (cached.con) {
    console.log("DB Verbindung aktiv");
    return cached.con;
  }
  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };
    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      console.log("DB Verbindung gestartet");
      return mongoose;
    });
  }
  cached.con = await cached.promise;
  return cached.con;
}

async function dbDisconnect() {
  await mongoose.disconnect();
  console.log("DB Verbindung beendet");
}

const mongodb = { dbConnect, dbDisconnect };
export default mongodb;
