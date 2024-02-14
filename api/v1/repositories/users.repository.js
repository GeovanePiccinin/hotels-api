import User from "../models/users.model.js";

async function getUsers(pagination) {
  try {
    return await User.findAndCountAll({ ...pagination });
  } catch (err) {
    throw err;
  }
}

async function getUser(id) {
  try {
    return await User.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function getUserByEmail(email) {
  try {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function createUser(user) {
  try {
    return await User.create(user);
  } catch (err) {
    throw err;
  }
}

async function deleteUser(id) {
  try {
    await User.destroy({
      where: {
        userId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updateUser(user) {
  try {
    await User.update(user, {
      where: {
        userId: user.userId,
      },
    });
  } catch (err) {
    throw err;
  }
}
async function updateRefreshToken(userId, refreshToken) {
  try {
    await User.update(
      { refreshToken: refreshToken },
      {
        where: {
          userId: userId,
        },
      }
    );
  } catch (err) {
    throw err;
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
};
