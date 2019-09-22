import crypt from 'crypto';

const crypto = () => {
   let payload = '';
    crypt.randomBytes(20, function (err, buffer) {
       payload = buffer.toString('hex');
        
    });
    return payload;
};
export default { crypto };
