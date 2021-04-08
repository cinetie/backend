/* eslint-disable no-useless-catch */
import sequelize from "sequelize";
import database from "../database/models";

const op = sequelize.Op;

class sendMailService {
  static async sendMassMail(mail) {
    try {
      return await database.sendMail.create({
        to: mail.to,
        from: mail.from,
        subject: mail.subject,
        messageId: mail.messageId,
        response: mail.response,
      });
    } catch (error) {
      throw error;
    }
  }
}

export default sendMailService;
