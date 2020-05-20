const { dataBase } = require("../data");
import * as jwt from "jsonwebtoken";

function validateEmailAndPassword() {
  return true;
}

function findUserIdForEmail(email) {}

module.exports = (req, res) => {
  // return res.status(200).json({
  //   error: false,
  //   msg: "Home Page",
  //   data: {},
  // });

  const email = req.body.email;
  const password = req.body.password;

  // if (validateEmailAndPassword()) {
  if (true()) {
    // const { userId, userRole } = findUserUserByEmail(email);
    const { userId, userRole } = { userId: 0, userRole: "basic" };

    const jwtBearerToken = jwt.sign(
      {
        subject: userId,
        role: userRole,
      },
      "shhhhh",
      {
        algorithm: "RS256",
        expiresIn: "1h",
        typ: "JWT",
      }
    );
  }
};
