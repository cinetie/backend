import response from '../helpers/response';
import profileServices from '../services/profileService';

class profileController {
    static async addProfile(req, res) {
        try {
            const addedProfile = await profileServices.addProfile(req.body);
            response.successResponse(res, 201, 'Profile successfully added!', addedProfile);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async getProfile(req,res){
        try {
            const returned = await profileServices.getParticalProfile(req.params.id);
            if(!returned) response.errorResponse(res, 404, 'Profile not found');
            response.successResponse(res, 200, 'Profile successfully retrieved!', returned);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async deleteProfile(req,res){
        try {
            const returned = await profileServices.getParticalProfile(req.params.id);
            if(!returned) response.errorResponse(res, 404, 'Profile not found');
            const deletedProfile = await profileServices.deleteProfile(req.params.id);
            response.successResponse(res, 200, 'Profile successfully deleted!', deletedProfile);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async getAllProfiles(req,res){
        try {
            const returned = await profileServices.getAllProfiles();
            response.successResponse(res, 200, 'Profiles successfully retrieved!', returned);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }
    static async updateProfile(req,res){
        try {
            const returned = await profileServices.getParticalProfile(req.params.id);
            if(!returned) response.errorResponse(res, 404, 'Profile not found');
            const toUpdate = req.body;
            const updated = await profileServices.updateProfile(req.params.id,toUpdate);
            response.successResponse(res, 200, 'Profile successfully updated!', updated[1][0]);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }
}

export default profileController;