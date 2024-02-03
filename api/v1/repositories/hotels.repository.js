import Hotel from "../models/hotels.model.js";

async function getHotels(pagination) {
  try {
    return await Hotel.findAndCountAll({ ...pagination });
  } catch (err) {
    throw err;
  }
}

async function getHotel(id) {
  try {
    return await Hotel.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function createHotel(hotel) {
  try {
    return await Hotel.create(hotel);
  } catch (err) {
    throw err;
  }
}

async function deleteHotel(id) {
  try {
    await Hotel.destroy({
      where: {
        hotelId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updateHotel(hotel) {
  try {
    await Hotel.update(hotel, {
      where: {
        hotelId: hotel.hotelId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  createHotel,
  updateHotel,
  getHotel,
  getHotels,
  deleteHotel,
};
