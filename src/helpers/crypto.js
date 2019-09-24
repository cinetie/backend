import crypt from 'crypto';

const crypto = () => {
   try {
      let payload = '';
      crypt.randomBytes(20, function (err, buffer) {
         payload = buffer.toString('hex');
         
      });
      return payload;
   } catch (error) {
      throw error;
   }
};
export default { crypto };
