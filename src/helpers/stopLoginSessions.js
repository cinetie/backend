import { Sequelize } from "sequelize";
import db from "../database/models";

const { Op } = Sequelize;
const start = new Date();
const date = new Date(start.getTime());
date.setDate(date.getDate() - 2);
const stopLoginSessions = async () => {
  const sessions = await db.loginSessions.update(
    { state: "out", timeOut: start.toTimeString() },
    {
      where: {
        createdAt: {
          [Op.lte]: date,
        },
      },
    }
  );
};

export default stopLoginSessions;
