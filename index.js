require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {logger} = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT;
// connectDB();

app.use(logger) ;//log requests to console and logfile

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(
//     cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
//   );
// app.use(passport.initialize());
// app.use(passport.session());

app.use(cors(corsOptions));

// let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Connected to the test database.');
// });
// // const sql = 'SELECT rowid,* FROM users'
// // db.all(sql,[],(err,rows) => {
// //   if(err) return console.error(err.message); 
// //   rows.forEach(row => console.log(row))
// // })
// // db.run('DROP TABLE transactions') 
// // db.run('CREATE TABLE users (name TEXT,email TEXT,password TEXT,balance INTEGER)')
// // db.run('CREATE TABLE transactions (userId INTEGER,date TEXT,description TEXT,withdraw INTEGER,credit INTEGER,balance INTEGER)')
// // db.run('CREATE TABLE bills (name TEXT,type TEXT,amount TEXT,dueDate TEXT,status TEXT,createdBy TEXT)')
// db.close((err) => {
//   if (err) {
//     console.error(err.message);
//   }
//   console.log('Closed the database connection.');
// });

app.use('/auth', require('./routes/auth'));
// app.use('/refresh', require('./routes/refresh'));
// app.use('/logout', require('./routes/logout'));

// app.use(verifyJWT);
app.use('/bill', require('./routes/bill'));
app.use('/user', require('./routes/user'));
app.use('/transaction', require('./routes/transaction'));

app.use(errorHandler); //log errors to errorLog file
app.listen(PORT,()=>{ console.log(`Express server listening on port ${PORT}`) });