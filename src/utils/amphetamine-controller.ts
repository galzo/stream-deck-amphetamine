import { runAppleScript } from "run-applescript";
import {
  AmpheatimeSessionInterval,
  AmphetamineControllerResult,
  AmphetamineSessionSettings,
} from "../types/amphetamine.types";
import streamDeck from "@elgato/streamdeck";
import { APPLE_SCRIPT_COMMANDS, APPLE_SCRIPT_NAMES } from "../consts/commands";

export const startNewSession = async (settings: AmphetamineSessionSettings) => {
  if (settings.duration !== undefined && settings.interval !== undefined) {
    return await _startTimedSession(settings.duration, settings.interval);
  }

  return await _startInfiniteSession();
};

export const endSession = async () => {
  return await _runAppleScriptCmd(
    APPLE_SCRIPT_NAMES.endSession,
    APPLE_SCRIPT_COMMANDS.endSession
  );
};

export const checkSession = async () => {
  return await _runAppleScriptCmd(
    APPLE_SCRIPT_NAMES.checkSession,
    APPLE_SCRIPT_COMMANDS.checkSession
  );
};

const _startInfiniteSession = async () => {
  return await _runAppleScriptCmd(
    APPLE_SCRIPT_NAMES.startSession,
    APPLE_SCRIPT_COMMANDS.startSession
  );
};

const _startTimedSession = async (
  duration: number,
  interval: AmpheatimeSessionInterval
) => {
  return await _runAppleScriptCmd(
    APPLE_SCRIPT_NAMES.startTimedSession,
    APPLE_SCRIPT_COMMANDS.startTimedSession(duration, interval)
  );
};

const _runAppleScriptCmd = async (
  name: string,
  command: string
): Promise<AmphetamineControllerResult> => {
  try {
    streamDeck.logger.info(
      `Running AppleScript Command. command name: ${name}`
    );

    const result = await runAppleScript(command);

    streamDeck.logger.info(
      `Apple script command ${name} successfully executed. `
    );

    return {
      isSuccess: true,
      result,
    };
  } catch (e) {
    streamDeck.logger.error(e);

    return {
      isSuccess: false,
      error: `${e}`,
    };
  }
};
