import { AmphetamineDuration } from "../types/amphetamine.types";

export const isSessionActive = (sessionDuration?: number) => {
  return Boolean(
    sessionDuration !== undefined &&
      sessionDuration > AmphetamineDuration.INACTIVE
  );
};

export const isInfiniteSession = (sessionDuration: number) => {
  if (!isSessionActive(sessionDuration)) {
    throw new Error("Session is inactive");
  }

  return sessionDuration <= 0;
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
