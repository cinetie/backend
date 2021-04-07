import amqplib from "amqplib";
import adminController from "../controllers/admin";

export const queueConsumer = async () => {
  const q = "massmail";
  amqplib
    .connect(process.env.AMQPS)
    .then((conn) => conn.createChannel())
    .then((ch) =>
      ch.assertQueue(q).then(() =>
        ch.consume(q, (msg) => {
          if (msg !== null) {
            const qm = JSON.parse(msg.content.toString());
            adminController
              .sendMassMailLog(msg)
              .then(() => ch.ack(msg))
              .catch(() => ch.nack(msg));
          }
        })
      )
    )
    .catch((err) => console.log(err));
};

export const sendMassMail = async (to, subject, body) => {
  const q = "massmail";
  const conn = await amqplib.connect(process.env.AMQPS);
  const ch = await conn.createChannel();
  await ch.assertQueue(q);

  const qm = JSON.stringify({ to, subject, body });
  return ch.sendToQueue(q, Buffer.from(qm, "utf-8"));
};
