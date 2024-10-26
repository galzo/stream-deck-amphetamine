import fs from "fs/promises";
import { AMPHETAMINE_INSTALL_PATH } from "../consts/global";
import streamDeck from "@elgato/streamdeck";
import { exec } from "child_process";
import { promisify } from "util";
const execPromise = promisify(exec);

export const isAmphetamineInstalled = async () => {
  try {
    streamDeck.logger.info("Testing if Amphetamine is installed on system");
    await fs.access(AMPHETAMINE_INSTALL_PATH, fs.constants.F_OK);
    streamDeck.logger.info("Amphetamine is installed on system");
    return true;
  } catch (e) {
    streamDeck.logger.error("Amphetamine is NOT installed on system");
    return false;
  }
};

export const isAmphetamineRunning = async () => {
  try {
    streamDeck.logger.info("Testing if Amphetamine is running on system");

    const { stdout } = await execPromise(
      'ps aux | grep -i "[A]mphetamine.app"'
    );

    const isRunning = Boolean(stdout);
    streamDeck.logger.info(`Is Amphetamine running: ${isRunning}`);

    return isRunning;
  } catch (e) {
    streamDeck.logger.error(e);
    return false;
  }
};
