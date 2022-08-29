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
       /*    if (req.body.roles){
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
          } */
          res.status(200).send(user)
      })
      .catch(err => {
          res.status(500).send({message: err.message});
      });
};

exports.signin = async (req, res) => {
    const utente = await User.findOne({where: { email: req.body.email }})
    if(utente && await bcrypt.compare(req.body.password,utente.password)){
     
    const token = jwt.sign(
        { email: req.body.email },
        config.secret,
        { expiresIn: 86400,}
    );
    res.status(200).send({
        username: utente.username,
        email: utente.email,
        authorized: true,
        token: token,
    });
}else{
    res.status(400).send({"Errore":"402"})
}

  console.log(`[SERVER]: ${req.body.email} Ha appena effettuato l'accesso`);
};
