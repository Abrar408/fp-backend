// const User = require('../model/users');
const sqlite3 = require('sqlite3').verbose(); 
// const {ObjectId} = require('bson');

const updateBalance = async (req, res) => {
    const {id,balance} = req.body;
    
    let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Connected to the test database.');
      });
      // console.log('s')
      
      const sql = 'UPDATE users SET balance=? WHERE rowid=?' 
      db.run(sql,[balance,id],(err) => {
        if(err) return res.status(400).send('error')
        console.log('user updated successfully')
        res.status(200).send("user updated successfully");
      })
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
      });
    // res.status(200).send(users) ;   
}

module.exports = {updateBalance}