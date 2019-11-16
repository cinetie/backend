const checker = (success,error) =>{
    if(success){
        return success;
    }else{
        return error;
    }
}

export default { checker };