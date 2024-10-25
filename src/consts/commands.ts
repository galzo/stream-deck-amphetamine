import { AmpheatimeSessionInterval } from "../types/amphetamine.types";
import { AMPHETAMINE_APP_NAME } from "./global";

export const APPLE_SCRIPT_COMMANDS = {
  startSession: `tell application "${AMPHETAMINE_APP_NAME}" to start new session`,
  startTimedSession: (duration: number, interval: AmpheatimeSessionInterval) =>
    `tell application "${AMPHETAMINE_APP_NAME}" to start new session with options {duration:${duration}, interval:${interval} }`,
  endSession: `tell application "${AMPHETAMINE_APP_NAME}" to end session`,
};

export const APPLE_SCRIPT_NAMES = {
  startSession: "Start infinite session",
  startTimedSession: "Start timed session",
  endSession: "End session",
};
