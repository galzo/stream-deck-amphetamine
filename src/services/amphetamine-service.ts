import {
  AmphetamineDuration,
  AmphetamineSessionDetails,
} from "../types/amphetamine.types";
import { checkSession } from "../utils/amphetamine-runner";
import {
  adaptSessionTime,
  isInfiniteSession,
  isSessionActive,
} from "../utils/amphetamine-session";
import {
  isAmphetamineInstalled,
  isAmphetamineRunning,
} from "../utils/environment-validator";

export class AmphetamineService {
  public isAmphetamineActive = async () => {
    const isInstalled = await isAmphetamineInstalled();
    if (!isInstalled) return false;

    const isRunning = await isAmphetamineRunning();
    return isRunning;
  };

  public getSession = async (): Promise<
    AmphetamineSessionDetails | undefined
  > => {
    const timeLeftSeconds = await this.getSessionTime();

    const isActive = isSessionActive(timeLeftSeconds);
    if (!isActive) return undefined;

    const isInfinite = isInfiniteSession(timeLeftSeconds!);
    if (isInfinite) return { isInfinite: true };

    const timeLeft = adaptSessionTime(timeLeftSeconds!);
    return { isInfinite: false, timeLeft };
  };

  private getSessionTime = async (): Promise<number | undefined> => {
    const res = await checkSession();
    if (!res.isSuccess) throw new Error("Failed fetching amphetamine session");

    return Number(res.result);
  };
}
