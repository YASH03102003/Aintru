const users = [];

function addUser(user) {
  user.isVerified = user.isVerified || false;
  user.verificationToken = user.verificationToken || null;
  users.push(user);
  return user;
}

function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

function findUserByProvider(provider, providerId) {
  return users.find(u => u.provider === provider && u.providerId === providerId);
}

module.exports = {
  addUser,
  findUserByEmail,
  findUserByProvider,
  users // for debugging
}; 