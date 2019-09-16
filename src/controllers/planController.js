import Util from '../helpers/utilities';
import planServices from '../services/planServices';
const util = new Util();
class planController {
    static async addPlan(req, res) {
      //  validator.profileValidator(req, res);
        const addedPlan = await planServices.addPlan(req.body);
        if (addedPlan) {
            util.setSuccessPost("Added plan", 201);
            return util.sendPost(res);
        } else {
            util.setError(500, "Can't add a new plan");
            return util.send(res);
        }
    }
    static async deleteAplan(req, res) {
        //  validator.profileValidator(req, res);
          const deletedPlan = await planServices.deletePlan(req.params.id);
          if (deletedPlan) {
              util.setSuccessPost("deleted plan", 204);
              return util.sendPost(res);
          } else {
              util.setError(500, "Can't delete  plan");
              return util.send(res);
          }
      }
    static async getParticularPlan(req,res){
        const returned = await planServices.getParticalPlan(req.params.id);
        if(returned){
            util.setSuccess("Found plan",200,returned);
            return util.send(res);
        }else{
            util.setError(500,"Can't fetch asked plan");
            return util.send(res);
        }
    }
    static async getAllPlans(req,res){
        const returned = await planServices.getAllPlan();
        if(returned){
            util.setSuccess("Found plans",200,returned);
            return util.send(res);
        }else{
            util.setError(500,"Can't fetch asked plans");
            return util.send(res);
        }
    }
    static async updatePlan(req,res){
        // validator.nameValidator(req,res);
        // validator.emailValidator(req,res);
        const toUpdate = req.body;
        const updated = await planServices.updatePlans(req.params.id,toUpdate);
        if(updated  >0){
            util.setSuccessPost("updated easily",202);
            return util.sendPost(res);
        }else {
            util.setError(502,"Can't update new plan");
            return util.sendPost(res);
        }
    }
}

export default planController;