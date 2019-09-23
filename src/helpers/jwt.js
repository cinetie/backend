import jwt from 'jsonwebtoken';

const jwtSign = (string,secret)=>{
    try{
        return jwt.sign(string,secret);
    } catch(error) {
        throw error;
    }
};

const jwtVerify = (token,secret)=>{
    try{
        return jwt.verify(token,secret);
    } catch (error){
        throw error;
    }
};

export default { jwtSign,jwtVerify };