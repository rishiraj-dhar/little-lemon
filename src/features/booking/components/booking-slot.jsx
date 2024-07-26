import { useMemo } from "react";
import { getDate, getTime } from "../utils/date";

import "./booking-slot.css";
import { occasions } from "../config";

/**
 * @typedef {object} Booking
 * @property {number} guestCount
 * @property {"anniversary" | "birthday"} occasion
 * @property {string} slot
 *
 * @typedef {object} BookingSlotProps
 * @property {Booking} booking
 *
 * @param {BookingSlotProps} props
 * @returns {React.ReactNode}
 */
export function BookingSlot({ booking }) {
  const slotParams = useMemo(() => {
    const slot = new Date(booking.slot);
    const date = getDate(slot);
    const time = getTime(slot);
    const { guestCount, occasion } = booking;
    return { date, guestCount, occasion, time };
  }, [booking]);

  return (
    <div className="slot-card">
      <div className="slot-header">{slotParams.date}</div>
      <dl className="slot-attributes">
        <div className="slot-field">
          <dt className="slot-attr-key">Time</dt>
          <dd className="slot-attr-value">{slotParams.time}</dd>
        </div>
        <div className="slot-field">
          <dt className="slot-attr-key">Guests</dt>
          <dd className="slot-attr-value">{slotParams.guestCount}</dd>
        </div>
      </dl>
      {slotParams.occasion ? (
        <div className="slot-label">
          {occasions.byNames[slotParams.occasion]}
        </div>
      ) : null}
    </div>
  );
}
