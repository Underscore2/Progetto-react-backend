const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Op = db.Sequelize.Op;
let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User
    .create({
      email: req.body.email,
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
      isEnabled: "Y",
    })
      .then(user => {
          if (req.body.roles){
              Role.findAll({
                  where: {
                      name: {
                          [Op.or]: req.body.roles
                      }
                  }
              }).then(roles => {
                  user.setRoles(roles).then(() => {
                      res.send({message: "User was registered successfully!" })
                  });
              });
          } else {
              // user role = 1
              user.setRoles([1]).then(() => {
                  res.send({message: "User was registered successfully!" })
              })
          }
      })
      .catch(err => {
          res.status(500).send({message: err.message});
      });
};

exports.signin = (req, res) => {
  User.findOne({
      where: { email: req.body.email },
  })
      .then(data => {
            if (!data) {
                return res.status(404).send({ message: "Email Not found." });
            }

            let passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            const token = jwt.sign(
                { email: req.body.email },
                config.secret,
                { expiresIn: 86400,}
            );
            res.status(200).send({
                username: data.username,
                email: data.email,
                authorized: true,
                token: token,
            });
      })
      .catch((err) =>{
          res.status(500).send({message: err.message});
          console.log(err.title);
      });

  console.log(`[SERVER]: ${req.body.email} Ha appena effettuato l'accesso`);
};
