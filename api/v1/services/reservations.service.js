import ReservationsRepository from "../repositories/reservations.repository.js";
import RoomServices from "../services/rooms.service.js";
import { dateDiff, getOnlyDate } from "../../utils/date.js";

async function getReservations(pagination) {
  return await ReservationsRepository.getReservations(pagination);
}

async function getReservation(id) {
  return await ReservationsRepository.getReservation(id);
}

async function createReservation(reservation) {
  const room = await RoomServices.getRoom(reservation.roomId);
  if (!room) {
    throw new Error("Room not found");
  }

  const checkReservations = await ReservationsRepository.checkReservations(
    reservation.roomId,
    getOnlyDate(reservation.checkin)
  );

  if (Array.isArray(checkReservations) && checkReservations.length) {
    const error = new Error("Quarto já foi reservado para esta data.");
    error.statusCode = 409;
    throw error;
  }

  const numberOfDays = dateDiff(
    reservation.checkin,
    reservation.checkout,
    "days"
  );
  const totalRent = numberOfDays * room.dailyRent;

  reservation.totalRent = totalRent;

  return await ReservationsRepository.createReservation(reservation);
}

async function deleteReservation(id) {
  return await ReservationsRepository.deleteReservation(id);
}

async function updateReservation(reservation) {
  return await ReservationsRepository.updateReservation(reservation);
}

export default {
  createReservation,
  updateReservation,
  getReservation,
  getReservations,
  deleteReservation,
};
