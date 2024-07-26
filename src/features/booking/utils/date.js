import { add, format, isAfter, isBefore, startOfDay } from "date-fns";
import { dateFormat, timeFormat } from "../config";

export function getToday() {
  const now = new Date();
  const today = startOfDay(now);
  return today;
}

export function getBookingDateLimits() {
  const today = getToday();
  const twoWeeksLater = add(today, { weeks: 2 });
  return { minDate: today, maxDate: twoWeeksLater };
}

export function getDate(slot) {
  return format(slot, dateFormat);
}

export function getTime(slot) {
  return format(slot, timeFormat);
}

export function isDateWithinRange(dateToCheck, rangeStartDate, rangeEndDate) {
  const isWithinValidRange =
    !isBefore(dateToCheck, rangeStartDate) &&
    !isAfter(dateToCheck, rangeEndDate);
  return isWithinValidRange;
}

export function resetTime(date) {
  return startOfDay(date);
}
