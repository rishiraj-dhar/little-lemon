import { useCallback, useReducer } from "react";
import { fetchAPI, submitAPI } from "src/api";
import { BookingForm } from "features/booking/components/booking-form";

import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function initializeTimes() {
  const today = new Date();
  const times = fetchAPI(today);
  return times;
}

function updateTimes(availableTimes, action) {
  switch (action.type) {
    case "booking/dateChanged": {
      const nextTimes = fetchAPI(action.payload.date);
      return nextTimes;
    }
    default: {
      return availableTimes;
    }
  }
}

export default function BookingPage() {
  const navigate = useNavigate();
  const [availableTimes, dispatch] = useReducer(
    updateTimes,
    undefined,
    initializeTimes,
  );

  const handleDateChange = useCallback(
    (date) => {
      const action = {
        type: "booking/dateChanged",
        payload: { date },
      };
      dispatch(action);
    },
    [dispatch],
  );

  const submitForm = useCallback(
    (formData) => {
      const slot = submitAPI({
        ...formData,
        occasion:
          formData.occasion !== "placeholder" ? formData.occasion : null,
      });
      if (slot === null) {
        return;
      }

      const path = "/confirmation";
      const searchParams = new URLSearchParams();
      searchParams.set("slot", slot);
      const search = searchParams.toString();
      const redirectUrl = `${path}?${search}`;
      navigate(redirectUrl);
    },
    [navigate],
  );

  return (
    <main>
      <section className="outer-wrapper booking">
        <div className="inner-wrapper">
          <BookingForm
            availableTimes={availableTimes}
            onDateChange={handleDateChange}
            onSubmit={submitForm}
          />
        </div>
      </section>
    </main>
  );
}
