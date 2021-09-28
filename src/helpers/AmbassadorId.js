const genUsername = require('unique-username-generator');

const AmbassadorIdGenerator = (email) => {
  const ambassadorId = genUsername.generateFromEmail(email, 3);
  return ambassadorId;
};

export default AmbassadorIdGenerator;
