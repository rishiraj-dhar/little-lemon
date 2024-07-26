import { cleanup, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, expect, it, vi } from "vitest";
import { BookingForm } from "../components/booking-form";
import { add, format, sub } from "date-fns";
import { dateFormat } from "../config";
import userEvent from "@testing-library/user-event";

afterEach(() => cleanup());

it("disables invalid future dates", async () => {
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={[]}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const dateField = screen.getByLabelText(/choose date/i);
  expect(dateField).toBeInTheDocument();

  const today = new Date();
  const expectedDateValue = format(today, dateFormat);
  expect(dateField).toHaveValue(expectedDateValue);

  const invalidFutureDate = add(today, { weeks: 2, days: 1 });
  const invalidFutureDateLabel = format(
    invalidFutureDate,
    "EEEE, MMMM do, yyyy",
  );
  await user.click(dateField);

  if (today.getMonth() < invalidFutureDate.getMonth()) {
    await user.click(screen.getByRole("button", { name: "Next Month" }));
  }

  const invalidFutureDateOption = screen.getByRole("option", {
    name: new RegExp(invalidFutureDateLabel),
  });
  expect(invalidFutureDateOption).toBeInTheDocument();
  expect(invalidFutureDateOption).toHaveAttribute("aria-disabled", "true");
});

it("disables invalid past dates", async () => {
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={[]}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const dateField = screen.getByLabelText(/choose date/i);
  expect(dateField).toBeInTheDocument();

  const today = new Date();
  const expectedDateValue = format(today, dateFormat);
  expect(dateField).toHaveValue(expectedDateValue);

  const invalidPastDate = sub(today, { weeks: 2, days: 1 });
  const invalidPastDateLabel = format(invalidPastDate, "EEEE, MMMM do, yyyy");
  await user.click(dateField);

  if (today.getMonth() > invalidPastDate.getMonth()) {
    await user.click(screen.getByRole("button", { name: "Previous Month" }));
  }

  const invalidPastDateOption = screen.getByRole("option", {
    name: new RegExp(invalidPastDateLabel),
  });
  expect(invalidPastDateOption).toBeInTheDocument();
  expect(invalidPastDateOption).toHaveAttribute("aria-disabled", "true");
});

it("shows error if no time slot is selected", async () => {
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={[]}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const timeField = screen.getByLabelText(/choose time/i);
  expect(timeField).toBeInTheDocument();
  expect(timeField).toHaveTextContent("Choose a time slot");

  await user.click(timeField);
  await user.keyboard("[Escape]");
  await user.tab();

  const errorMessage = /please select a valid time slot/i;
  const error = screen.getByText(errorMessage);
  expect(error).toBeInTheDocument();
});

it("shows error for guest count = 0", async () => {
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={[]}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const guestCountField = screen.getByLabelText(/number of guests/i);
  expect(guestCountField).toBeInTheDocument();
  expect(guestCountField).toHaveValue(2);

  await user.clear(guestCountField);
  await user.type(guestCountField, "0");
  await user.tab();

  const errorMessage = /please select one or more guests/i;
  const error = screen.getByText(errorMessage);
  expect(error).toBeInTheDocument();
});

it("shows error for guest count > 10", async () => {
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={[]}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const guestCountField = screen.getByLabelText(/number of guests/i);
  expect(guestCountField).toBeInTheDocument();
  expect(guestCountField).toHaveValue(2);

  await user.clear(guestCountField);
  await user.type(guestCountField, "11");
  await user.tab();

  const errorMessage = /please select 10 or fewer guests/i;
  const error = screen.getByText(errorMessage);
  expect(error).toBeInTheDocument();
});

it("shows error for empty guest count", async () => {
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={[]}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const guestCountField = screen.getByLabelText(/number of guests/i);
  expect(guestCountField).toBeInTheDocument();
  expect(guestCountField).toHaveValue(2);

  await user.clear(guestCountField);
  await user.tab();

  const errorMessage = /please enter a valid number/i;
  const error = screen.getByText(errorMessage);
  expect(error).toBeInTheDocument();
});

it("shows selected date correctly", async () => {
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={[]}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const dateField = screen.getByLabelText(/choose date/i);
  expect(dateField).toBeInTheDocument();

  const today = new Date();
  const expectedDateValue = format(today, dateFormat);
  expect(dateField).toHaveValue(expectedDateValue);

  const validOffsetInDays = Math.floor(Math.random() * 14);
  const validDate = add(today, { days: validOffsetInDays });
  const validDateLabel = format(validDate, "EEEE, MMMM do, yyyy");
  await user.click(dateField);

  if (today.getMonth() < validDate.getMonth()) {
    await user.click(screen.getByRole("button", { name: "Next Month" }));
  }

  const validDateOption = screen.getByRole("option", {
    name: new RegExp(validDateLabel),
  });
  expect(validDateOption).toBeInTheDocument();
  expect(validDateOption).toHaveAttribute("aria-disabled", "false");

  await user.click(validDateOption);
  const validDateValue = format(validDate, dateFormat);
  expect(dateField).toHaveValue(validDateValue);
});

it("disables submit button if no time slot is selected", async () => {
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={[]}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const dateField = screen.getByLabelText(/choose date/i);
  expect(dateField).toBeInTheDocument();

  const today = new Date();
  const expectedDateValue = format(today, dateFormat);
  expect(dateField).toHaveValue(expectedDateValue);

  const guestCountField = screen.getByLabelText(/number of guests/i);
  expect(guestCountField).toBeInTheDocument();
  expect(guestCountField).toHaveValue(2);

  const timeField = screen.getByLabelText(/choose time/i);
  expect(timeField).toBeInTheDocument();

  const placeholderText = "Choose a time slot";
  expect(timeField).toHaveTextContent(placeholderText);

  await user.selectOptions(timeField, placeholderText);

  const submitButton = screen.getByRole("button", /make your reservation/i);
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
});

it("disables submit button for invalid guest counts", async () => {
  const availableTimes = ["08:00", "09:00", "09:30", "10:00", "11:00"];
  const timeToSelect = "09:30";
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={availableTimes}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const dateField = screen.getByLabelText(/choose date/i);
  expect(dateField).toBeInTheDocument();

  const today = new Date();
  const expectedDateValue = format(today, dateFormat);
  expect(dateField).toHaveValue(expectedDateValue);

  const timeField = screen.getByLabelText(/choose time/i);
  expect(timeField).toBeInTheDocument();
  expect(timeField).toHaveTextContent("Choose a time slot");

  await user.selectOptions(timeField, timeToSelect);
  expect(timeField).toHaveValue(timeToSelect);

  const guestCountField = screen.getByLabelText(/number of guests/i);
  expect(guestCountField).toBeInTheDocument();
  expect(guestCountField).toHaveValue(2);

  const submitButton = screen.getByRole("button", /make your reservation/i);
  expect(submitButton).toBeInTheDocument();

  await user.clear(guestCountField);
  expect(submitButton).toBeDisabled();

  await user.clear(guestCountField);
  await user.type(guestCountField, "0");
  expect(submitButton).toBeDisabled();

  await user.clear(guestCountField);
  await user.type(guestCountField, "11");
  expect(submitButton).toBeDisabled();
});

it("enables submit button for valid form inputs", async () => {
  const availableTimes = ["08:00", "09:00", "09:30", "10:00", "11:00"];
  const timeToSelect = "09:30";
  const user = userEvent.setup();
  render(
    <BookingForm
      availableTimes={availableTimes}
      onDateChange={vi.fn()}
      onSubmit={vi.fn()}
    />,
  );

  const dateField = screen.getByLabelText(/choose date/i);
  expect(dateField).toBeInTheDocument();

  const today = new Date();
  const expectedDateValue = format(today, dateFormat);
  expect(dateField).toHaveValue(expectedDateValue);

  const validOffsetInDays = Math.floor(Math.random() * 14);
  const validDate = add(today, { days: validOffsetInDays });
  const validDateLabel = format(validDate, "EEEE, MMMM do, yyyy");
  await user.click(dateField);

  if (today.getMonth() < validDate.getMonth()) {
    await user.click(screen.getByRole("button", { name: "Next Month" }));
  }

  const validDateOption = screen.getByRole("option", {
    name: new RegExp(validDateLabel),
  });
  expect(validDateOption).toBeInTheDocument();
  expect(validDateOption).toHaveAttribute("aria-disabled", "false");

  await user.click(validDateOption);
  const validDateValue = format(validDate, dateFormat);
  expect(dateField).toHaveValue(validDateValue);

  const timeField = screen.getByLabelText(/choose time/i);
  expect(timeField).toBeInTheDocument();
  expect(timeField).toHaveTextContent("Choose a time slot");

  await user.selectOptions(timeField, timeToSelect);
  expect(timeField).toHaveValue(timeToSelect);

  const guestCountField = screen.getByLabelText(/number of guests/i);
  expect(guestCountField).toBeInTheDocument();
  expect(guestCountField).toHaveValue(2);

  const validGuestCount = 1 + Math.floor(Math.random() * 9);
  await user.clear(guestCountField);
  await user.type(guestCountField, validGuestCount.toString());

  const occasionField = screen.getByLabelText(/occasion/i);
  const occasionOptionList = within(occasionField).getAllByRole("option");
  const optionIndex = Math.floor(
    Math.random() * (occasionOptionList.length - 1),
  );
  const occasionOption = occasionOptionList[optionIndex];
  await user.selectOptions(occasionField, occasionOption);

  const submitButton = screen.getByRole("button", /make your reservation/i);
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeEnabled();
});
