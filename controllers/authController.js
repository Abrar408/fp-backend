// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const User = require('../model/users');
const sqlite3 = require('sqlite3').verbose();

const register = async (req, res) => {
    const {name,email,password} = req.body;

    if(name == '' || email == '' || password == '') return res.status(400).send('required fields cannot be blank');

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send('please enter a valid email address');    
    
    let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the test database.');
    });

    const sql = 'INSERT INTO users(name,email,password,balance) VALUES(?,?,?,?)' 
    db.run(sql,[name,email,password,0],(err)=>{
        if(err) return res.status(200).send(err.message);
        console.log('User added successfully')
        res.status(200).send("user registered successfully");
    }) 
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        });

    // const result = await User.findOne({email:email}).exec();
    // if(result) return res.status(400).send("email already exists");
    // const hashedPassword = await bcrypt.hash(password,10);
    // await User.create({username:username,email:email,password:hashedPassword});
    
    
}
const login = async (req, res) => {
    const {email,password} = req.body;
    if(email == '' || password == '') return res.status(400).send('required fields cannot be blank');

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send('please enter a valid email address'); 

    
    let db = new sqlite3.Database('./test.db',sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the test database.');
        });
    
        const sql = 'SELECT rowid,* FROM users WHERE email=?'
        db.get(sql,[email],(err,result)=>{
            if(err) return res.status(200).send(err.message);
            if(!result) return res.status(400).send('user not found');
            if(result.password != password) return res.status(400).send('Username or password incorrect')
            // const refreshToken = jwt.sign(
            //             { "id":result.rowid },
            //             process.env.REFRESH_TOKEN_SECRET,
            //             {expiresIn: '1d'}
            //         );
                    
            //         // await User.updateOne({_id:result.id},{$set:{refreshToken}});
            //         res.cookie('jwt',refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite:'none', secure: true});
            const resCred = {id:result.rowid,name:result.name,email:result.email,balance:result.balance}
            res.status(200).json({resCred});
            // res.status(200).send("user registered successfully");
        }) 
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Closed the database connection.');
            });
    // const result = await User.findOne({email}).exec();
    // // console.log(result);
    // if(!result) return res.status(400).send('Incorrect username or password');
    // const checkPassword = async () => {
    //     const isMatch = await bcrypt.compare(password,result.password);
    //     if(!isMatch) return res.status(400).send('Incorrect username or password');
    //     // console.log(result.id)
    //     const accessToken = jwt.sign(
    //         { "id":result.id },
    //         process.env.ACCESS_TOKEN_SECRET,
    //         {expiresIn: '1h'}
    //     );
    //     const refreshToken = jwt.sign(
    //         { "id":result.id },
    //         process.env.REFRESH_TOKEN_SECRET,
    //         {expiresIn: '1d'}
    //     );
    //     const resCred = {username:result.username,email:result.email,admin:result.admin}
    //     await User.updateOne({_id:result.id},{$set:{refreshToken}});
    //     res.cookie('jwt',refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite:'none', secure: true});
    //     res.status(200).json({resCred,accessToken}); 
    // }
    // checkPassword();
    
       
}

module.exports = {register,login}