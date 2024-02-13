import ReservationsRepository from "../repositories/reservations.repository.js";
import RoomServices from "../services/rooms.service.js";
import { dateDiff } from "../../utils/date.js";

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

  const numberOfDays = dateDiff(reservation.checkout, reservation.checkin);
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
