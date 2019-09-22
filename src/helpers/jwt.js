import jwt from 'jsonwebtoken';

const jwtSign = (string,secret)=>{

    return jwt.sign(string,secret);
};

const jwtVerify = (token,secret)=>{
    return jwt.verify(token,secret);
};

export default { jwtSign,jwtVerify };