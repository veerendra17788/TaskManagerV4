// // const { Pool } = require('pg');
// // require('dotenv').config();

// // const pool = new Pool({
// //   connectionString: process.env.DATABASE_URL,
// //   ssl: {
// //     rejectUnauthorized: false, // required for self-signed certs (e.g., Render, Heroku, etc.)
// //   },
// // });

// // module.exports = pool;

// const mongoose = require('mongoose');
// require('dotenv').config();

// console.log(process.env.DATABASE_URL);

// async function connect() {
//   try {
//     // const dbURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/vk'; 
//     await mongoose.connect(process.env.DATABASE_URL);
//     console.log('✅ MongoDB connected');
//   } catch (error) {
//     console.error('❌ MongoDB connection error:', error);
//     process.exit(1); // Exit on failure
//   }
// }

// module.export = connect;
