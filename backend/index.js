const { ROLES, dataBase } = require("./data");

const express = require("express");
const app = express();
const { authUser, authRole } = require("./middlewares/middlewares");
const {
  adminRoute,
  loginRoute,
  projectRoute,
  superAdminRoute,
} = require("./routes/routes");

app.use(express.json());
app.use(setUser);

app.use("/", loginRoute);
app.use("/projects", authUser, projectRoute);
app.use("/admin", authUser, authRole(ROLES.admin), adminRoute);
app.use("/superAdmin", authUser, authRole(ROLES.superAdmin), superAdminRoute);

app.listen(3000);

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = dataBase.users.find((user) => user.id === userId);
  }
  next();
}
