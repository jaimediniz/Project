const ROLES = {
  none: 0,
  basic: 1,
  admin: 2,
  superAdmin: 3,
};

module.exports.ROLES = ROLES;

module.exports.dataBase = {
  ROLES,
  users: [
    { id: 1, name: "User 1", roleLevel: ROLES.superAdmin },
    { id: 2, name: "User 2", roleLevel: ROLES.admin },
    { id: 3, name: "User 3", roleLevel: ROLES.basic },
  ],
  projects: [
    { id: 1, name: "Project 1", userId: 1 },
    { id: 2, name: "Project 2", userId: 2 },
    { id: 3, name: "Project 3", userId: 3 },
  ],
};
