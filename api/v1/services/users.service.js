import UsersRepository from "../repositories/Users.repository.js";

async function getUsers(pagination) {
  return await UsersRepository.getUsers(pagination);
}

async function getUser(id) {
  return await UsersRepository.getUser(id);
}

async function getUserByEmail(email) {
  return await UsersRepository.getUserByEmail(email);
}

async function createUser(user) {
  return await UsersRepository.createUser(user);
}

async function deleteUser(id) {
  return await UsersRepository.deleteUser(id);
}

async function updateUser(user) {
  return await UsersRepository.updateUser(user);
}

async function updateRefreshToken(userId, refreshToken) {
  return await UsersRepository.updateRefreshToken(userId, refreshToken);
}

function basicAuthentication(user, password) {
  if (user === process.env.USER && password === process.env.PASSWORD) {
    return true;
  }
}

export default {
  createUser,
  updateUser,
  getUser,
  getUsers,
  deleteUser,
  updateRefreshToken,
  getUserByEmail,
  basicAuthentication,
};
