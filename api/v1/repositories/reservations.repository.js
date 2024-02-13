import Reservation from "../models/reservations.model.js";

async function getReservations(pagination) {
  try {
    return await Reservation.findAndCountAll({ ...pagination });
  } catch (err) {
    throw err;
  }
}

async function getReservation(id) {
  try {
    return await Reservation.findByPk(id);
  } catch (err) {
    throw err;
  }
}

async function createReservation(reservation) {
  try {
    return await Reservation.create(reservation);
  } catch (err) {
    throw err;
  }
}

async function deleteReservation(id) {
  try {
    await Reservation.destroy({
      where: {
        reservationId: id,
      },
    });
  } catch (err) {
    throw err;
  }
}

async function updateReservation(reservation) {
  try {
    await Reservation.update(reservation, {
      where: {
        reservationId: reservation.reservationId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export default {
  createReservation,
  updateReservation,
  getReservation,
  getReservations,
  deleteReservation,
};
