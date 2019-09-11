//doorman is an access level checker 
import Util from '../helpers/utilities';
import jwt from 'jsonwebtoken';
const util = new Util();
class doorman{
    static async isTokenValid(req,res){
       let token = req.headers['x-access-token'] || req.headers['Authorization'];  //eq.headers['authorization']
       if(token != null){
           token = token.slice(7,token.length);
           if(token){
            jwt.verify(token,process.env.SECRET,(err,res)=>{
              if(err){
                  util.setError(403,"Token invalid");
                  return util.send(res);
              }else{
                  util.setSuccess("Token valid",200,res);
                  return  util.send(res);
              }
          });
      }else{
          return false;
      }
       }else{
           return "token null";
       }
      
    }
}
export default doorman;