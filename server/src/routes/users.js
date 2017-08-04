import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
//import Promise from 'bluebird';
import isEmpty from 'lodash/isEmpty';

const User = require('../models/user');

let router = express.Router();

function validateInput(data, otherValidations, callback) {
  let { errors } = otherValidations(data);

  return User.getUserByUsername(data.username, user => {
    if(user) {
      if(user.get('username') === data.username) {
        errors.username = 'There is user with such username';
      }
      if(user.get('email') === data.email) {
        errors.email = 'There is user with such email';
      }
    }

    callback({
      errors,
      isValid: isEmpty(errors)
    });
  });

  // return Promise.all([
  //   User.where({ email: data.email }).fetch().then(user => {
  //     if(user) errors.email = 'There is user with such email';
  //   }),
  //   User.where({ username: data.username }).fetch().then(user => {
  //     if(user) errors.username = 'There is user with such username';
  //   })
  // ]).then(() => {
  //   return {
  //     errors,
  //     isValid: isEmpty(errors)
  //   }
  // });

}

router.post('/:identifier', (req, res) => {

  User.getUserByUsername(req.params.identifier, user => {
    res.json({ user });
  });

})

router.post('/', (req, res) => {
  validateInput(req.body, commonValidations, ({ errors, isValid }) => {
    if(isValid) {

      let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });

      User.addUser(newUser, err => {
        if(err)
          res.json({ error: err });
        else
          res.json({ success: true });
      });
    } else {
      res.json(errors);
    }
  });


});

export default router;
