const { dataBase } = require("../data");
const jwt = require("jsonwebtoken");
const fs = require("fs");

function validEmailAndPassword() {
  return true;
}

function findUserIdForEmail(email) {
  return { userId: 0, userRole: "basic" };
}

const RSA_PRIVATE_KEY = fs.readFileSync(
  "backend/api/v1/functions/demo/private.key"
);

const generateToken = (req, res) => {
  const { email, password } = req.body;

  if (!validEmailAndPassword()) {
    // send status 400 Bad Request
    res.sendStatus(400).json({ error: true, msg: "Email or password invalid" });
  }

  const userInfo = findUserIdForEmail(email);
  if (!userInfo) {
    // send status 404 Not Found
    res.sendStatus(404).json({ error: true, msg: "User not founded" });
  }

  const jwtBearerToken = jwt.sign(
    {
      subject: userInfo.userId,
      role: userInfo.userRole,
    },
    RSA_PRIVATE_KEY, // process.env.JWT_SECRET
    {
      algorithm: "RS256",
      expiresIn: "1h",
    }
  );

  return res
    .cookie("clientToken", jwtBearerToken, {
      expires: new Date(Date.now() + 3600000),
      secure: false, // set to true if your using https
      httpOnly: true,
    })
    .json({ error: false, msg: "Success" });
};

module.exports = generateToken;
