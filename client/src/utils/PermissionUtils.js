// isLoggedIn() will accept either a token, userType, or userId
// to return true if they are not empty strings and therefore
// the user is logged in
function isLoggedIn(user) {
  return user && user.length !== 0;
}

// isAdmin() will accept a userType (nothing, customer, or admin)
// and return true if and only if that type is admin
function isAdmin(userRole) {
  return userRole && userRole === "admin";
}

// sendToLogin() will send the user to the login page
function sendToLogin() {
  window.location.href = "/login";
}

module.exports = {
  isLoggedIn,
  isAdmin,
  sendToLogin,
};
