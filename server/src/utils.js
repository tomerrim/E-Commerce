import  jwt  from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({_id: user._id, name: user.name, email: user.email}, process.env.JWT,{expiresIn: "15d"});
}

export const isAuth= (req, res, next) => {
    // const token = req.headers.authorization;
    const bearerToken = req.headers.Authorization;

    if(bearerToken){
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, process.env.JWT, (err, decoded) => {
            if(err){
                return res.status(401).json({message: `Token verification failed: ${err.message}`});
            }
            console.log("Decoded Token: ", decoded);
            req.user = decoded;
            next();
        });
    }else{
        return res.status(401).json({message: "No token provided"});
    }
}