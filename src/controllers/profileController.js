import Util from '../helpers/utilities';
import profileServices from '../services/profileService';
import validator from '../validators/validation';

const util = new Util();
class profileController {
    static async addProfile(req, res) {
        validator.profileValidator(req, res);
        const addedProfile = await profileServices.addProfile(req.body);
        if (Object.values(addedProfile).length >= 3) {
            util.setSuccessPost("Added profile", 201);
            return util.sendPost(res);
        } else {
            util.setError(500, "Can't add a new profile");
            return util.send(res);
        }
    }
    static async getProfile(req,res){
        const returned = await profileServices.getParticalProfile(req.params.id);
        if(returned){
            util.setSuccess("Found profile",200,returned);
            return util.send(res);
        }else{
            util.setError(500,"Can't fetch asked profile");
            return util.send(res);
        }
    }
    static async deleteProfile(req,res){
        const deletedProfile = await profileServices.deleteProfile(req.params.id);
        if(deletedProfile){
            util.setSuccessPost("deleted successfully",200);
            return util.sendPost(res);
        }else{
            util.setError(500,"Can't delete profile");
            return util.send(res);
        }
    }
    static async getAllProfiles(req,res){
        const returned = await profileServices.getAllProfiles();
        if(Object.values(returned).length >=3){
            util.setSuccess("Found profiles",200,returned);
            return util.send(res);
        }else{
            util.setError(500,"Can't fetch asked profile");
            return util.send(res);
        }
    }
    static async updateProfile(req,res){
        const toUpdate = req.body;
        const updated = await profileServices.updateProfile(req.params.id,toUpdate);
        if(updated  >0){
            util.setSuccessPost("updated easily",202);
            return util.sendPost(res);
        }else {
            util.setError(502,"Can't update new profile");
            return util.sendPost(res);
        }
    }
}

export default profileController;