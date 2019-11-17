const sequelize = require('sequelizeConnection');

const sequelizeOperators = sequelize.Op;
const userModel = require('../../db/models/UserModel.js');
const createUserAccount = require('../../db/CreateUserAccount.js');

function signUp(registrationRequest, response) {
  userModel.user.findOne({
    raw: true,
    where: {
      [sequelizeOperators.or]: [{ login: registrationRequest.login }, { email: registrationRequest.email }],
    },
  })
    .then((User) => {
      if (!User) {
        createUserAccount.createUserAccount(registrationRequest, response);
        return;
      }
      response.status(400).send('Такой пользователь уже есть');
    });
}
module.exports.signUp = signUp;
