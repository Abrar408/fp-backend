const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/users');

const register = async (req, res) => {
    const {username,email,password} = req.body;

    if(username == '' || email == '' || password == '') return res.status(400).send('required fields cannot be blank');

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send('please enter a valid email address');    
    
    const result = await User.findOne({email:email}).exec();
    if(result) return res.status(400).send("email already exists");
    const hashedPassword = await bcrypt.hash(password,10);
    await User.create({username:username,email:email,password:hashedPassword});
    res.status(200).send("user registered successfully");
    
}
const login = async (req, res) => {
    const {email,password} = req.body;
    if(email == '' || password == '') return res.status(400).send('required fields cannot be blank');

    if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) return res.status(400).send('please enter a valid email address'); 

    const result = await User.findOne({email}).exec();
    // console.log(result);
    if(!result) return res.status(400).send('Incorrect username or password');
    const checkPassword = async () => {
        const isMatch = await bcrypt.compare(password,result.password);
        if(!isMatch) return res.status(400).send('Incorrect username or password');
        // console.log(result.id)
        const accessToken = jwt.sign(
            { "id":result.id },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '1h'}
        );
        const refreshToken = jwt.sign(
            { "id":result.id },
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '1d'}
        );
        const resCred = {username:result.username,email:result.email}
        await User.updateOne({_id:result.id},{$set:{refreshToken}});
        res.cookie('jwt',refreshToken, {httpOnly: true, maxAge: 24*60*60*1000, sameSite:'none', secure: true});
        res.status(200).json({resCred,accessToken}); 
    }
    checkPassword();
    
       
}

module.exports = {register,login}