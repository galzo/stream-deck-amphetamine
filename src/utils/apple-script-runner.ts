import streamDeck from "@elgato/streamdeck";
import { AppleScriptRunResult } from "../types/apple-script.types";
import { runAppleScript } from "run-applescript";

export const runAppleScriptCmd = async (
  name: string,
  command: string
): Promise<AppleScriptRunResult> => {
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
