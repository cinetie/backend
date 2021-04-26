/* eslint-disable no-useless-catch */
import sequelize from "sequelize";
import database from "../database/models";

const op = sequelize.Op;

class emailTemplateService {
  static async saveMailTemplate(template) {
    try {
      return await database.TemplateMail.create({
        templateName: template.templateName,
        templateData: template.templateData,
      });
    } catch (error) {
      throw error;
    }
  }

  static async getMailTemplateById(id) {
    try {
      return await database.TemplateMail.findOne({
        where: {
          id,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async updateMailTemplateById(id, updates) {
    try {
      return await database.TemplateMail.update(
        updates,{
        returning: true,
        where: {
          id
        },
      });
    } catch (error) {
      throw error;
    }
  }

  static async getAllMailTemplate(id) {
    try {
      return await database.TemplateMail.findAll();
    } catch (error) {
      throw error;
    }
  }
}

export default emailTemplateService;