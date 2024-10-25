export type AmpheatimeSessionInterval = "minutes" | "hours";

export interface AmphetamineSessionSettings {
  duration?: number;
  interval?: AmpheatimeSessionInterval;
}

export type AmphetamineControllerResult =
  | {
      isSuccess: true;
      result: string;
    }
  | { isSuccess: false; error: string };
