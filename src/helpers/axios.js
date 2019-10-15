import axios from 'axios';

const post = (url,data) =>{
    axios.post(url,data)
    .then((response)=>{
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })
}
export default { post };