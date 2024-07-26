import { Button } from "components/button";
import { BookingSlot } from "features/booking/components/booking-slot";
import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAllBookings } from "src/api";

export default function ConfirmationPage() {
  const [searchParams] = useSearchParams();
  const slot = searchParams.get("slot");

  const bookings = useMemo(() => {
    return getAllBookings();
  }, []);

  return (
    <main className="confirmation-page">
      {slot !== null ? (
        <section
          aria-labelledby="booking-confirmation"
          className="outer-wrapper booking-confirmation"
        >
          <div className="inner-wrapper">
            <h1 id="booking-confirmation">Booking Confirmation</h1>
            <div className="slot-card-list">
              <BookingSlot booking={bookings.bySlot[slot]} />
            </div>
            <div>
              <Button>
                <Link to="/">Return to Home Page</Link>
              </Button>
            </div>
          </div>
        </section>
      ) : null}
      {bookings.allSlots.length > 0 ? (
        <section
          aria-labelledby="upcoming-bookings"
          className="outer-wrapper upcoming-bookings"
        >
          <div className="inner-wrapper">
            <h1 id="upcoming-bookings">Your Upcoming Bookings</h1>
            <div className="slot-card-list">
              {bookings.allSlots.map((bookingSlot) => {
                const booking = bookings.bySlot[bookingSlot];
                return <BookingSlot key={bookingSlot} booking={booking} />;
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="outer-wrapper booking-confirmation">
          <div className="inner-wrapper">
            <h1 id="booking-confirmation">Oops!</h1>
            <p className="booking-confirmation-msg">
              Looks like you don&apos;t having any upcoming reservations. ☹️
            </p>
            <div>
              <Button>
                <Link to="/booking">Click here to make a reservation</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
