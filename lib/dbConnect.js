const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;

if(!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose;

if(!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  /* check if we have connection to our databse*/
  if (cached.conn) {
    return cached.conn;
  }
  
  if(!cached.promise) {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: false,
      useCreateIndex: true,
    }

    cached.promise = mongoose
    .connect(MONGODB_URI, options)
    .then((mongoose) => {
      return mongoose;
    })
  }
  cached.conn = await cached.promise;
  return cached.conn
}

export default dbConnect;