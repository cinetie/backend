 
import axios from "axios";

const post = async (url, data) => {
  axios
    .post(url, data)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
const get = (url, options) => {
  axios
    .get(url, options)
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
export default { post, get };
