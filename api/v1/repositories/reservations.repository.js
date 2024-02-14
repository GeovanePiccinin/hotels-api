import Reservation from "../models/reservations.model.js";
import sequelize from "./db.js";

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

async function checkReservations(roomId, checkin) {
  try {
    const [results, metadata] = await sequelize.query(`
      SELECT * FROM "reservations"
      WHERE
        room_id = ${roomId}
      AND (
          checkin <= '${checkin}'
        AND
          checkout >= '${checkin}'
      )
    `);
    return results;
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
  checkReservations,
};
