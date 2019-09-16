import database from '../database/models';

class planServices {
    static async addPlan(newPlan) {

        const addedPlan = await database.plans.create(newPlan);
        if (addedPlan) {
            return addedPlan;
        } else {
            return null;
        }

    }
    static async deletePlan(id) {
        const deletedPlan = await database.plans.destroy({
            where: {
                id: id
            }
        });
        if (deletedPlan) {
            return deletedPlan;
        } else {
            return null;
        }
    }
    static async updatePlans(id, plan) {
        const updatedPlan = await database.plans.update(plan, {
            where: {
                id: id
            }
        });
        if (updatedPlan) {
            return updatedPlan;
        } else {
            return null;
        }
    }
    static async getParticalPlan(id) {
        const foundPlan = await database.plans.findOne({
            where: {
                id: id
            }
        });
        if (foundPlan) {
            return foundPlan;
        } else {
            return null;
        }
    }
    static async getAllPlan() {
        const foundPlans = await database.plans.findAll();
        if (foundPlans) {
            return foundPlans;
        }else{
            return null;
        }
    }
}

export default planServices;