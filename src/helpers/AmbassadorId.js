import { customAlphabet } from "nanoid";

const AmbassadorIdGenerator = () => {
  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
  return nanoid();
};

export default AmbassadorIdGenerator;
