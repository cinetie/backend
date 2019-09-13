import nodemailer from 'nodemailer';
class mailerMiddleware{
    static async mailer(emailTosend){
        const options = {
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "12d7d5e199e9ca",
              pass: "9bb14817f05d00"
            }
        };
        const client = nodemailer.createTransport(options);
        client.sendMail(emailTosend,function(err,info){
            if(err){
                console.log(err);
            }else{
                console.log(info);
            }
        });
    }
}

export default mailerMiddleware;