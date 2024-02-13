import RoomsRepository from "../repositories/rooms.repository.js";

async function getRooms(pagination) {
  return await RoomsRepository.getRooms(pagination);
}

async function getRoom(id) {
  return await RoomsRepository.getRoom(id);
}

async function createRoom(room) {
  return await RoomsRepository.createRoom(room);
}

async function deleteRoom(id) {
  return await RoomsRepository.deleteRoom(id);
}

async function updateRoom(room) {
  return await RoomsRepository.updateRoom(room);
}

export default {
  createRoom,
  updateRoom,
  getRoom,
  getRooms,
  deleteRoom,
};
