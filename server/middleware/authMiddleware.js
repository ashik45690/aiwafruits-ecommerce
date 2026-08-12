import jwt from 'jsonwebtoken'

export async function AuthMiddleware(req,res,next) {
    
    try {

     const token = req.cookies.token;

     if (!token) {
        return res.json({
            success:false,
            message:"Login First"
        })
     }
     
     const decode = jwt.verify(token,process.env.JWT_SECRET);

     console.log(decode,'..........decode..........................');

     
     req.user = decode;
     
        

     next();
        
    } catch (error) {
        res.json({
            success:false,
            message:"Authmiddleware faield ..check now "
        })
    }
}