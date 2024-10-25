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
  commandName: string,
  command: string
): Promise<AmphetamineControllerResult> => {
  try {
    streamDeck.logger.info(
      `Running AppleScript Command. command name: ${commandName}`
    );

    const res = await runAppleScript(command);

    streamDeck.logger.info(
      `Apple script command ${commandName} successfully executed. `
    );

    return {
      isSuccess: true,
      result: res,
    };
  } catch (e) {
    streamDeck.logger.error(e);

    return {
      isSuccess: false,
      error: `${e}`,
    };
  }
};
