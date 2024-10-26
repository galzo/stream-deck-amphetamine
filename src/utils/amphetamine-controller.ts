import { runAppleScript } from "run-applescript";
import {
  AmpheatimeSessionInterval,
  AmphetamineSessionSettings,
} from "../types/amphetamine.types";
import { APPLE_SCRIPT_COMMANDS, APPLE_SCRIPT_NAMES } from "../consts/commands";
import { runAppleScriptCmd } from "./apple-script-runner";

export const startNewSession = async (settings: AmphetamineSessionSettings) => {
  if (settings.duration !== undefined && settings.interval !== undefined) {
    return await _startTimedSession(settings.duration, settings.interval);
  }

  return await _startInfiniteSession();
};

export const endSession = async () => {
  return await runAppleScriptCmd(
    APPLE_SCRIPT_NAMES.endSession,
    APPLE_SCRIPT_COMMANDS.endSession
  );
};

export const checkSession = async () => {
  return await runAppleScriptCmd(
    APPLE_SCRIPT_NAMES.checkSession,
    APPLE_SCRIPT_COMMANDS.checkSession
  );
};

const _startInfiniteSession = async () => {
  return await runAppleScriptCmd(
    APPLE_SCRIPT_NAMES.startSession,
    APPLE_SCRIPT_COMMANDS.startSession
  );
};

const _startTimedSession = async (
  duration: number,
  interval: AmpheatimeSessionInterval
) => {
  return await runAppleScriptCmd(
    APPLE_SCRIPT_NAMES.startTimedSession,
    APPLE_SCRIPT_COMMANDS.startTimedSession(duration, interval)
  );
};
