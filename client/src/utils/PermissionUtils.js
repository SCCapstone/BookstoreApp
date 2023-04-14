function isLoggedIn(user) {
  return user && user.length !== 0;
}

function isAdmin(userRole) {
  return userRole && userRole === "admin";
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
