import { useMemo } from "react";
import { getBookingDateLimits } from "../utils/date";

export function useBookingDateLimits() {
  const limits = useMemo(() => {
    return getBookingDateLimits();
  }, []);
  return limits;
}
