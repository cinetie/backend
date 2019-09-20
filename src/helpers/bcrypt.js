import bcrypt from 'bcrypt';

const encrypt = (plainPassword) => {
    const newPass = bcrypt.hashSync(plainPassword, bcrypt.genSaltSync(10), null);
    return newPass;

}
const compare = (plainPassword, encrypted) => {
    if (plainPassword == null || plainPassword == undefined || encrypted == null || encrypted == undefined) {
        return "password is null";

    } else {
        const status = bcrypt.compareSync(plainPassword, encrypted);
        if (status) {
            return  status;
        } else {
            return  status;
        }
    }
}

export default { encrypt, compare };