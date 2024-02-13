import UsersRepository from "../repositories/users.repository.js";

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

export default {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  createUser,
  getUserByEmail,
};
