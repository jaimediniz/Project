const { ROLES, dataBase } = require("./data");

const express = require("express");
const router = express();

const { authUser, authRole } = require("./middlewares/middlewares");
const {
  adminRoute,
  loginRoute,
  projectRoute,
  superAdminRoute,
} = require("./routes/routes");

router.use(express.json());
router.use(setUser);

router.use("/", loginRoute);
router.use("/projects", authUser, projectRoute);
router.use("/admin", authUser, authRole(ROLES.admin), adminRoute);
router.use(
  "/superAdmin",
  authUser,
  authRole(ROLES.superAdmin),
  superAdminRoute
);

function setUser(req, res, next) {
  const userId = req.body.userId;
  if (userId) {
    req.user = dataBase.users.find((user) => user.id === userId);
  }
  next();
}

module.exports = router;
