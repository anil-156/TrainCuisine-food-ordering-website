const jwt = require('jsonwebtoken')

exports.Auth = (req,res,next)=>{
    // const cookie = req.cookies;
    // const token = req.cookies.token;
    
    let token = req.header('token');
    console.log(token)
    
    if(!token){
        return res.json({
            success:false,
            message:"Token is missing"
        })
    }

    try{
        let payload = jwt.verify(token,process.env.SECRET_KEY);
        console.log(payload)
        req.user = payload;

        next();
    }catch(err){
        console.log('error in auth ->',err.message)
        return res.json({
            success:false,
            message:"Token is invalid"
        })
    }

}