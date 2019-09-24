import response from '../helpers/response';
import planServices from '../services/planServices';
import Util from '../helpers/utilities';

const util = new Util();
class planController {
    static async addPlan(req, res) {
        try {
            const getPlan  = await planServices.getParticalPlan(req.body.type);
            if(getPlan){
                util.setErrorResponse(res,"Plan exists already should you consider updating it instead",422);
            }else {
                const addedPlan = await planServices.addPlan(req.body);
                util.setSuccessResponse(res, 'Plan successfully added!', 201, addedPlan);
            }  
        } catch(error) {
            util.setErrorResponse(res, 'Something went wrong : ' + error , 503);
        }
    }

    static async deleteAplan(req, res) {
        try {
            const returned = await planServices.getParticalPlan(req.params.id);
            if(!returned) response.errorResponse(res, 404, 'Plan not found');
            const deletedPlan = await planServices.deletePlan(req.params.id);
            response.successResponse(res, 200, 'Plan successfully deleted!', deletedPlan);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async getParticularPlan(req,res){
        try {
            const returned = await planServices.getParticalPlan(req.params.id);
            if(!returned) response.errorResponse(res, 404, 'Plan not found');
            response.successResponse(res, 200, 'Plan successfully retrieved!', returned);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async getAllPlans(req,res){
        try {
            const returned = await planServices.getAllPlan();
            response.successResponse(res, 200, 'Plans successfully retrieved!', returned);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }

    static async updatePlan(req,res){
        try {
            const returned = await planServices.getParticalPlan(req.params.id);
            if(!returned) response.errorResponse(res, 404, 'Plan not found');
            const toUpdate = req.body;
            const updated = await planServices.updatePlans(req.params.id,toUpdate);
            response.successResponse(res, 200, 'Plan successfully updated!', updated[1][0]);
        } catch(error) {
            response.errorResponse(res, 500, 'Something went wrong', error);
        }
    }
}

export default planController;