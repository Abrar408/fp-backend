// const Task = require('../model/task');
// const {format} = require('date-fns');
const sqlite3 = require('sqlite3').verbose(); 
// function titleCase(str) {
//     return str.toLowerCase().split(' ').map(function(word) {
//         return word.replace(word[0], word[0].toUpperCase());
//     }).join(' ');
// }

const add = async (req,res) => {
    const {name,type,amount,dueDate,createdBy} = req.body;

    let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Connected to the test database.');
      });
      // console.log('s')
      const status = 'pending'
      const sql = 'INSERT INTO bills (name,type,amount,dueDate,status,createdBy) VALUES(?,?,?,?,?,?)' 
      db.run(sql,[name,type,amount,dueDate,status,createdBy],(err) => {
        if(err) return res.status(400).send('error')
        console.log('Bill created successfully')
        res.status(200).send("bill created successfully");
      })
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
      });
}
const get = async (req,res) => {
    const {createdBy} = req.body;
    let bills = [];
    let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Connected to the test database.');
      });
      // console.log('s')
      const sql = 'SELECT rowid,* FROM bills WHERE createdBy=? ORDER BY status DESC' 
      db.all(sql,[createdBy],(err,rows) => {
        if(err) return res.status(400).send('error')
        rows.forEach(row => bills.push(row))
        res.status(200).send({bills});
        // console.log(bills)
      })
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
      });
}
const update = async (req,res) => {
  const {id} = req.body;

  let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        return console.error(err);
      }
      console.log('Connected to the test database.');
    });
    // console.log('s')
    const status = 'paid'
    const sql = 'UPDATE bills SET status=? WHERE rowid=?' 
    db.run(sql,[status,id],(err) => {
      if(err) return res.status(400).send('error')
      console.log('Bill updated successfully')
      res.status(200).send("bill updated successfully");
    })
    
    db.close((err) => {
      if (err) {
        console.error(err.message);
      }
      console.log('Closed the database connection.');
    });
}
module.exports = {add,get,update}