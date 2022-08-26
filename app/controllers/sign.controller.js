const db = require("../models/");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const user = db.user;
exports.signup = (req, res) => {
  user
    .create({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isEnabled: "Y",
    })
    .then(res.status(200).send({ authorized: true }))
    .catch((err) => console.log("SIGN-C1: Failed  ", err.title));
  console.log(`${req.body.email} E' stato inserito nel database.`);
};

exports.signin = (req, res) => {
  user
    .findOne({
      where: { email: req.body.email },
    })
    .then((data) => {
      const token = jwt.sign({ email: req.body.email }, config.secret, {
        expiresIn: 86400,
      });
      res.status(200).send({ username: data.username, authorized: true, token: token, email: data.email });
    })
    .catch((err) => console.log(err.title));

  console.log(`[SERVER]: ${req.body.email} Ha appena effettuato l'accesso`);

};
