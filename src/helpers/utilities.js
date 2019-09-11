import bcrypt from 'bcrypt';

export default class Util {

    constructor() {
        this.statusCode = null;
        this.type = null;
        this.message = null;
        this.data = null;
    }
    setSuccess(message, statusCode, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.type = 'success';
    }
    setSuccessPost(message, statusCode) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = 'success';
    }

    setError(statusCode, message) {
        this.statusCode = statusCode;
        this.message = message;
        this.type = "Error";
    }

    encrypt(plainPassword){
        const newPass = bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10),null);
        return newPass;

    }
    compare(plainPassword,encrpted){
        return bcrypt.compareSync(plainPassword,encrpted);
    }
    send(res) {
        const result = {
            statusCode:this.statusCode,

            status: this.type,
            message: this.message,
            data: this.data
        };
        if (this.type === 'success') {
            return res.status(this.statusCode).json(result);

        } 
        return res.status(this.statusCode).json({
            statusCode:this.statusCode,

            status: this.type,
            message: this.message,
        });
    }
    sendPost(res) {
        const result = {

            statusCode:this.statusCode,
            status: this.type,
            message: this.message,
          
        };
        if (this.type === 'success') {
            return res.status(this.statusCode).json(result);
        } 
        return res.status(this.statusCode).json({
            statusCode:this.statusCode,

            status: this.type,
            message: this.message,
        });
    }

}

}
  
    

