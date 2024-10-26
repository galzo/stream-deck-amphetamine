import { AmphetamineDuration } from "../types/amphetamine.types";

export const isSessionActive = (sessionDuration?: number) => {
  return sessionDuration && sessionDuration !== AmphetamineDuration.INACTIVE;
};

export const isInfiniteSession = (sessionDuration: number) => {
  return sessionDuration < 0;
};

export const adaptSessionTime = (sessionDuration: number) => {
  if (sessionDuration <= 0) {
    throw new Error("Invalid duration. must be a positive number");
  }

  const totalMinutesLeft = Math.round(sessionDuration / 60);
  const hoursLeft = Math.floor(totalMinutesLeft / 60);
  const minutesLeft = totalMinutesLeft % 60;

  return {
    hours: hoursLeft,
    minutes: minutesLeft,
  };
};
