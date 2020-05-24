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
  "backend/api/v0/functions/demo/private.key"
);

const generateToken = async (req, res) => {
  const { email, password } = req.body;

  if (!validEmailAndPassword()) {
    // send status 400 Bad Request
    res.statusCode = 400;
    res.setHeader("Content-Type", "text/plain");
    res.end("Invalid email and/or password ");
    return;
  }

  const userInfo = findUserIdForEmail(email);
  if (!userInfo) {
    // send status 404 Not Found
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("User not founded");
    return;
  }

  const jwtBearerToken = jwt.sign(
    {
      userId: userInfo.userId,
      role: userInfo.userRole,
    },
    RSA_PRIVATE_KEY, // process.env.JWT_SECRET
    {
      algorithm: "RS256",
      expiresIn: "1h",
    }
  );

  const data = {
    userId: userInfo.userId,
    role: userInfo.userRole,
    clientToken: jwtBearerToken,
  };

  console.log("Set");
  res.cookie("clientToken", jwtBearerToken, {
    maxAge: 3600000,
    secure: false, // set to true if your using https
    httpOnly: false,
  });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json(data);
  res.end();
};

module.exports = generateToken;
