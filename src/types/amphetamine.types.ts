export type AmpheatimeSessionInterval = "minutes" | "hours";

export interface AmphetamineSessionSettings {
  duration?: number;
  interval?: AmpheatimeSessionInterval;
}

export enum AmphetamineDuration {
  INFINITE = 0,
  TRIGGER_BASED = -1,
  APP_BASED = -2,
  INACTIVE = -3,
}

export interface AmphetamineSessionDetails {
  isInfinite: boolean;
  timeLeft?: {
    hours: number;
    minutes: number;
  };
}
