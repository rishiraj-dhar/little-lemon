import { useCallback } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { Button } from "components/button";
import { useBookingDateLimits } from "../hooks";
import { getDate, isDateWithinRange, resetTime } from "../utils/date";
import { dateFormat, guestCountLimits, occasions } from "../config";

import "./booking-form.css";

function RequiredBadge() {
  return <span className="badge required">required</span>;
}

export function BookingForm({ availableTimes, onDateChange, onSubmit }) {
  const { minDate, maxDate } = useBookingDateLimits();
  const {
    control,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      date: minDate,
      time: "placeholder",
      guestCount: 2,
      occasion: "placeholder",
    },
    mode: "onTouched",
  });

  const validateDate = useCallback(
    (date) => {
      const dateToValidate = resetTime(date);
      const isValid = isDateWithinRange(dateToValidate, minDate, maxDate);
      return (
        isValid ||
        `Please select a date between ${getDate(minDate)} and ${getDate(maxDate)}`
      );
    },
    [maxDate, minDate],
  );

  return (
    <form id="booking-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="booking-form-field">
        <label htmlFor="date">
          <span>Choose date</span>
          <RequiredBadge />
        </label>
        <Controller
          control={control}
          id="date"
          name="date"
          render={({ field }) => (
            <DatePicker
              {...field}
              id="date"
              dateFormat={dateFormat}
              minDate={minDate}
              maxDate={maxDate}
              name="date"
              onBlur={field.onBlur}
              onChange={(date) => {
                const selectedDate = resetTime(date);
                field.onChange(selectedDate);
                onDateChange(selectedDate);
              }}
              selected={field.value}
            />
          )}
          rules={{ validate: validateDate, valueAsDate: true }}
        />
        {errors.date ? (
          <div className="error-msg">{errors.date.message}</div>
        ) : null}
      </div>
      <div className="booking-form-field">
        <label htmlFor="time">
          <span>Choose time</span>
          <RequiredBadge />
        </label>
        <select
          {...register("time", {
            validate: (value) =>
              value !== "placeholder" || "Please select a valid time slot",
          })}
          id="time"
        >
          <option value="placeholder">Choose a time slot</option>
          {availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {errors.time ? (
          <div className="error-msg">{errors.time.message}</div>
        ) : null}
      </div>
      <div className="booking-form-field">
        <label htmlFor="guestCount">
          <span>Number of guests</span>
          <RequiredBadge />
        </label>
        <input
          {...register("guestCount", {
            max: {
              message:
                "Sorry, we are unable to serve more than 10 people at a time. Please select 10 or fewer guests.",
              value: guestCountLimits.max,
            },
            min: {
              message: "Please select one or more guests",
              value: guestCountLimits.min,
            },
            validate: (value) =>
              !Number.isNaN(value) || "Please enter a valid number",
            valueAsNumber: true,
          })}
          id="guestCount"
          max={guestCountLimits.max}
          min={guestCountLimits.min}
          type="number"
        />
        {errors.guestCount ? (
          <div className="error-msg">{errors.guestCount.message}</div>
        ) : null}
      </div>
      <div className="booking-form-field">
        <label htmlFor="occasion">
          <span>Occasion</span>
        </label>
        <select {...register("occasion")} id="occasion">
          <option value="placeholder">Choose an occasion</option>
          {occasions.allNames.map((occasion) => {
            const occasionLabel = occasions.byNames[occasion];
            return (
              <option key={occasion} value={occasion}>
                {occasionLabel}
              </option>
            );
          })}
        </select>
      </div>
      <Button disabled={!isDirty || !isValid} type="submit">
        Make Your Reservation
      </Button>
    </form>
  );
}
