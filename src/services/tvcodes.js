/**
 * @description: Includes the database service definition of the TvCode table
 * @author: @avici1
 * 
 */

import sequelize from "sequelize";
import database from "../database/models";

const { TvCodes } = database;

class Service {
    /**
     * @description: Class definition for the servie
     */
    constructor() {
        this.op = sequelize.Op;
    }

    async create(data) {
        /**
         * @description: Create a new TvCode
         * @param {Object} data: The data to be inserted
         * @returns {Object} The newly created TvCode
         */
        try {
            console.log()
            const code = await TvCodes.create(data);
            return code;
        } catch (error) {
            throw error;
        }
    }

    async find(condition) {
        /**
         * @description: Find a TvCode
         * @param {Object} condition: The condition to be met
         * @returns {Object} The TvCode found
         */
        try {
            const code = await TvCodes.findOne({
                where: condition,
            });
            return code;
        } catch (error) {
            throw error;
        }
    }

    async remove(id) {
        /**
         * @description: Remove a TvCode
         * @param {Number} id: The id of the TvCode to be removed
         * @returns {Boolean} The status of the operation
         */
        try {
            const code = await TvCodes.destroy({
                where: { id },
            });
            return code;
        } catch (error) {
            throw error;
        }
    }
}

export default Service;