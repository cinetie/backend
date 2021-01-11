import Util from './utilities';
import '@hapi/joi';

const util = new Util();
export default (schema, toValidate, res, next) => {
  const { error } = schema.validate(toValidate);
  console.log(error)
  return error
    ? util.setErrorResponse(res, error.details[0].message, 422)
    : next();
};
