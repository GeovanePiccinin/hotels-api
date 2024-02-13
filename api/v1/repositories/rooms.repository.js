import Room from "../models/rooms.model.js";

async function getRooms(pagination) {
  try {
    return await Room.findAndCountAll({ ...pagination });
  } catch (err) {
    throw err;
  }
}

async function getRoom(id) {
  try {
    return await Room.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function createRoom(room) {
  try {
    return await Room.create(room);
  } catch (err) {
    throw err;
  }
}

async function deleteRoom(id) {
  try {
    await Room.destroy({
      where: {
        roomId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updateRoom(room) {
  try {
    await Room.update(room, {
      where: {
        roomId: room.roomId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
};
