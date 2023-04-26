const sqlite3 = require('sqlite3').verbose(); 

const create = async (req, res) => {
    const {userId,description,withdraw,credit,balance} = req.body;
    
    let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Connected to the test database.');
      });
      // console.log('s')
      const date = new Date().toLocaleDateString();

      const sql = 'INSERT INTO transactions (userId,date,description,withdraw,credit,balance) VALUES(?,?,?,?,?,?)'; 
      db.run(sql,[userId,date,description,withdraw,credit,balance],(err) => {
        if(err) return res.status(400).send('error')
        console.log('transaction created successfully')
        res.status(200).send("transaction created successfully");
      })
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
      });
    // res.status(200).send(users) ;   
}
const get = async (req, res) => {
    const {id} = req.body;
    let transactions = [];
    let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('Connected to the test database.');
      });
      // console.log('s')
      
      const sql = 'SELECT * FROM transactions WHERE userId=?' 
      db.all(sql,[id],(err,rows) => {
        if(err) return res.status(400).send('error')
        rows.forEach(row => transactions.push(row))
        res.status(200).send({transactions});
        
      })
      db.close((err) => {
        if (err) {
          console.error(err.message);
        }
        console.log('Closed the database connection.');
      });
    // res.status(200).send(users) ;   
}

module.exports = {create,get}