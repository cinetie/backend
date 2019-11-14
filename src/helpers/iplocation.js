import iplocation from 'iplocation';

//this helper uses the provided ip address and extracts valuable information
//like city,country,countryCode,isp among many others
const getSendersIp = (ip) => {
    iplocation(ip)
    .then((res)=> res)
    .catch((error)=>{
        throw error;
    })
}

export default { getSendersIp };