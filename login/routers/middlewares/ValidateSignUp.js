const express = require('express');

const router = express.Router();
const registrationRequest = require('../../db/db_objects/RegestrationRequest.js');
const signUpValidation = require('../../core/validations/SignUpValidation.js');

router.post('/', (request, response, next) => {
  const registrationRequestData = new registrationRequest(request.body.login, request.body.email, request.body.password);
  if (signUpValidation.validateSignUp(registrationRequestData, response)) {
    return next();
  }

  response.status(400).send('Данные введены неправильно');
});
module.exports = router;
