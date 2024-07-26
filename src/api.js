/**
 * Type Definitions
 * ---
 *
 * @typedef {object} BookingFormData
 * @property {Date} date - date of booking
 * @property {number} guestCount - number of guests
 * @property {string | null} occasion - booking occasion
 * @property {string} time - time of booking in `hh:mm`
 *
 * @typedef {object} Booking
 * @property {number} guestCount - number of guests
 * @property {Occasion} occasion - booking occasion
 * @property {string} slot - ISO 8601 string representing booking slot
 *
 * @typedef {object} BookingCollection
 * @property {Array<string>} allSlots - list of slots with reservations
 * @property {Record<string, Booking>} bySlot - dictionary of bookings, indexed by slot
 */

import {
  formatISO,
  isValid,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from "date-fns";
import { occasions } from "features/booking/config";
import { getDate, getTime } from "features/booking/utils/date";

const seededRandom = function (seed) {
  var m = 2 ** 35 - 31;
  var a = 185852;
  var s = seed % m;
  return function () {
    return (s = (s * a) % m) / m;
  };
};

export const fetchAPI = function (date) {
  let result = [];
  let random = seededRandom(date.getDate());

  for (let i = 17; i <= 23; i++) {
    if (random() < 0.5) {
      result.push(i + ":00");
    }
    if (random() < 0.5) {
      result.push(i + ":30");
    }
  }
  return result;
};

/**
 * @param {unknown} formData
 * @returns {formData is BookingFormData} boolean indicating whether `formData` is valid.
 */
const isBookingFormData = function (formData) {
  if (
    formData === undefined ||
    formData === null ||
    typeof formData !== "object"
  ) {
    return false;
  }

  if (!("date" in formData)) {
    return false;
  }

  const { date } = formData;

  if (!isValid(date)) {
    return false;
  }

  if (!("time" in formData)) {
    return false;
  }

  const { time } = formData;

  if (typeof time !== "string") {
    return false;
  }

  const timeSegments = time.split(":");
  if (timeSegments.length !== 2) {
    return false;
  }

  const [hours, minutes] = timeSegments;
  if (hours < "00" || hours >= "24") {
    return false;
  }
  if (minutes !== "00" && minutes !== "30") {
    return false;
  }

  if (!("guestCount" in formData)) {
    return false;
  }

  const { guestCount } = formData;
  if (typeof guestCount !== "number") {
    return false;
  }
  if (guestCount < 1 || guestCount > 10) {
    return false;
  }

  if (!("occasion" in formData)) {
    return false;
  }

  const { occasion } = formData;
  if (occasion !== null && !occasions.allNames.includes(occasion)) {
    return false;
  }

  return true;
};

/**
 * @param {unknown} collection
 * @returns {collection is BookingCollection} boolean indicating whether `collection` is valid.
 */
const isBookingCollection = function (collection) {
  if (
    collection === undefined ||
    collection === null ||
    typeof collection !== "object"
  ) {
    return false;
  }

  if (!("allSlots" in collection)) {
    return false;
  }

  const { allSlots } = collection;
  if (!Array.isArray(allSlots)) {
    return false;
  }

  if (!("bySlot" in collection)) {
    return false;
  }

  const { bySlot } = collection;
  if (bySlot === undefined || bySlot === null || typeof bySlot !== "object") {
    return false;
  }

  return true;
};

/**
 * @param {Booking} booking
 */
const addBooking = function (booking) {
  try {
    const cachedBookingsData = window.localStorage.getItem("bookings");

    /** @type {BookingCollection} */
    let prevBookings = JSON.parse(cachedBookingsData);
    const isPrevBookingsValid = isBookingCollection(prevBookings);
    if (!isPrevBookingsValid) {
      prevBookings = { allSlots: [], bySlot: {} };
    }

    const allSlots = !prevBookings.allSlots.includes(booking.slot)
      ? prevBookings.allSlots.concat(booking.slot)
      : prevBookings.allSlots.slice();
    const bySlot = { ...prevBookings.bySlot, [booking.slot]: booking };

    const nextBookings = { allSlots, bySlot };
    window.localStorage.setItem("bookings", JSON.stringify(nextBookings));
  } catch (error) {
    console.error(error);
  }
};

export const getAllBookings = function () {
  try {
    const cachedBookingsData = window.localStorage.getItem("bookings");

    /** @type {BookingCollection} */
    let bookings = JSON.parse(cachedBookingsData);
    const isBookingsValid = isBookingCollection(bookings);
    if (!isBookingsValid) {
      bookings = { allSlots: [], bySlot: {} };
    }

    return bookings;
  } catch (error) {
    console.error(error);
  }
};

export const getBooking = function (slot) {
  const allBookings = getAllBookings();
  const booking = allBookings.bySlot[slot];
  return booking ?? null;
};

/**
 * Submits booking form data
 *
 * @param {unknown} formData
 */
export const submitAPI = function (formData) {
  const isFormDataValid = isBookingFormData(formData);
  if (!isFormDataValid) {
    return null;
  }
  const { date, guestCount, occasion, time } = formData;
  const [hours, minutes] = time.split(":").map(Number);
  const dateWithMilliseconds = setMilliseconds(date, 0);
  const dateWithSeconds = setSeconds(dateWithMilliseconds, 0);
  const dateWithMinutes = setMinutes(dateWithSeconds, minutes);
  const dateWithHours = setHours(dateWithMinutes, hours);
  const slot = formatISO(dateWithHours);

  const prevBooking = getBooking(slot);
  if (prevBooking !== null) {
    const formattedDate = getDate(slot);
    const formattedTime = getTime(slot);
    const message = `You already have a reservation for ${formattedDate} at ${formattedTime}. Do you want to update the reservation with these details?`;
    const shouldReplace = window.confirm(message);
    if (!shouldReplace) {
      return;
    }
  }

  /** @type {Booking} */
  const booking = { guestCount, occasion, slot };
  addBooking(booking);
  return slot;
};
