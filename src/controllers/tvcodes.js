/**
 * @description Controller that manages the TvCodes
 * @author: @avici1
 */

import math from '../helpers/math';
import TvCode from '../services/tvcodes';
import Util from '../helpers/utilities';
import jwt from '../helpers/jwt'

class Controller {
    /**
     * @description: Class definition for the controller
     */
    constructor() {
        this.service = new TvCode();
        this.util = new Util();

        // Bind the methods to the class, 
        // This is to allow NodeJS to know in which context the methods are being called
        this.createTvCode = this.createTvCode.bind(this);
        this.getTvCode = this.getTvCode.bind(this);
        this.deleteTvCode = this.deleteTvCode.bind(this);
        this.validateTvCode = this.validateTvCode.bind(this);
    }

    async createTvCode(req, res) {
        /**
         * @description: Create a new TvCode
         * @param {Object} req: The request object
         * @param {Object} res: The response object
         * @returns {Object} The newly created TvCode
         */
        try {
            const randomCode = math.randomNumber(1000, 9999);
            const code = await this.service.create({ 
                 code: randomCode,
                 email: req.user,
                 expires: new Date(Date.now() + 24 * 60 * 60 * 1000)});
            return this.util.setSuccessResponse(res, "TvCode created successfully", 201, { code });
        } catch (error) {
            console.log(error);
            return this.util.setErrorResponse(res, 'CTV-0:0', 500);
        }
    }

    async getTvCode(req, res) {
        /**
         * @description: Get a TvCode
         * @param {Object} req: The request object
         * @param {Object} res: The response object
         * @returns {Object} The TvCode found
         */
        try {
            const code = await this.service.find({ email: req.user });
            if (!code) {
                return this.util.setErrorResponse(res, "TvCode not found - CTV-1:0", 404);
            }
            return this.util.setSuccessResponse(res, "TvCode found", 200, code);
        } catch (error) {
            console.log(error);
            return this.util.setErrorResponse(res, "CTV-1:1", 500);
        }
    }

    async deleteTvCode(req, res) {
        /**
         * @description: Delete a TvCode
         * @param {Object} req: The request object
         * @param {Object} res: The response object
         * @returns {Boolean} The status of the operation
         */
        try {
            const code = await this.service.remove(req.params.id.toString());
            if (code) {
                return this.util.setSuccessResponse(res, "TvCode deleted successfully", 200);
            }
            return this.util.setErrorResponse(res, "TvCode not found CTV-2:0", 404);
        } catch (error) {
            console.log(error);
            return this.util.setErrorResponse(res, "CTV-2:1", 500);
        }
    }

    async validateTvCode(req, res) {
        /**
         * @description: Validate a TvCode
         * @param {Object} req: The request object
         * @param {Object} res: The response object
         * @returns {Boolean} The status of the operation
         */
        try {
            const code = await this.service.find({ code: req.params.code });
            if (!code) {
                return this.util.setErrorResponse(res, "TvCode not found CTV-3:0", 404);
            }
            if (code.expires < new Date()) {
                return this.util.setErrorResponse(res, "TvCode has expired CTV-3:1", 404);
            }
	    const token = jwt.jwtSign(
		    {
		      email:code.email
		    },
		    process.env.SECRET,
		    "3hr"
	    )
            return this.util.setSuccessResponse(res, "TvCode validated successfully", 200, token);
        } catch (error) {
            console.log(error);
            return this.util.setErrorResponse(res, "CTV-3:2", 500);
        }
    }
}

export default Controller;
