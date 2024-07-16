const registerUser = require('./registerUser');
const login = require('./login');
const logout = require('./logout');
const refreshTokens = require('./refreshTokens');
const current = require('./current');

module.exports = {
  registerUser,
  login,
  logout,
  refreshTokens,
  current,
};
