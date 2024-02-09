import HotelRepository from "../../repositories/hotels.repository.js";

async function createHotel(Hotel) {
  return await HotelRepository.insertHotel(Hotel);
}

async function getHotels() {
  return await HotelRepository.getHotels(null, false);
}

async function getHotel(id) {
  return await HotelRepository.getHotel(id);
}

async function deleteHotel(id) {
  return await HotelRepository.deleteHotel(id);
}

async function updateHotel(Hotel) {
  return await HotelRepository.updateHotel(Hotel);
}

async function updateBalance(Hotel) {
  const acc = await HotelRepository.getHotel(Hotel.id);
  acc.balance = Hotel.balance;
  return await HotelRepository.updateHotel(acc);
}

export default {
  createHotel,
  getHotels,
  getHotel,
  deleteHotel,
  updateHotel,
  updateBalance,
};
