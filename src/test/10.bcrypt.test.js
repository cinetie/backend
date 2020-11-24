import chai, { expect } from 'chai';
import bcrypt from '../helpers/bcrypt'

const success = {
    status: 200,
    message: 'success'
}

const error = {
    status: 404,
    message: 'error'
}

const encrypted = '$2a$10$JUCGXOZMZUDUHXqRpbdoVuQ.0RuEEV26NKwnZUQJ2K1tE4FwW.nE.'

describe('BCRYPT', () => {
    it('CHECK COMPARE TRUE', async () => {
        const results = await bcrypt.compare('password', encrypted);
        console.log('results', results)
    });

    it('CHECK COMPARE TRUE', async () => {
        const results = await bcrypt.encrypt('password');
        console.log('results', results)
    });
});