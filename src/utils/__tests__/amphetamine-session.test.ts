import { describe } from "node:test";
import { expect, test } from "vitest";
import {
  adaptSessionTime,
  isInfiniteSession,
  isSessionActive,
} from "../amphetamine-session";

const SESSION_VALUES = {
  INACTIVE: -3,
  INVALID: -15,
  VALID: 15,
  INFINITE: 0,
  APP_BASED: -1,
  TRIGGER_BASED: -2,
};

const SESSION_TIME_VALUES = {
  ONE_MINUTE: 60,
  ONE_HOUR: 3600,
  ONE_HOUR_ONE_MINUTE: 3660,
  ONE_AND_HALF_HOUR: 5400,
};

describe("isSessionActive", () => {
  test("Should return false if no session was passed in", () => {
    expect(isSessionActive()).toBe(false);
  });
  test("Should return false if the session has inactive value", () => {
    expect(isSessionActive(SESSION_VALUES.INACTIVE)).toBe(false);
  });
  test("Should return false if session has invalid value", () => {
    expect(isSessionActive(SESSION_VALUES.INVALID)).toBe(false);
  });
  test("Should return true if session has valid value", () => {
    expect(isSessionActive(SESSION_VALUES.VALID)).toBe(true);
  });
});

describe("isInfiniteSession", () => {
  test("Should return false if session has valid time", () => {
    expect(isInfiniteSession(SESSION_VALUES.VALID)).toBe(false);
  });
  test("Should return true if session is infinite", () => {
    expect(isInfiniteSession(SESSION_VALUES.INFINITE)).toBe(true);
  });
  test("Should return true if session is any negative", () => {
    expect(isInfiniteSession(SESSION_VALUES.APP_BASED)).toBe(true);
    expect(isInfiniteSession(SESSION_VALUES.TRIGGER_BASED)).toBe(true);
  });
  test("Should throw an error if session is inactive", () => {
    expect(() => isInfiniteSession(SESSION_VALUES.INACTIVE)).toThrow();
  });
  test("Should not throw an error if active", () => {
    expect(() => isInfiniteSession(SESSION_VALUES.VALID)).not.throw();
  });
});

describe("adaptSessionTime", () => {
  test("Should throw on infinite or inactive session", () => {
    expect(() => adaptSessionTime(SESSION_VALUES.INFINITE)).toThrow();
    expect(() => adaptSessionTime(SESSION_VALUES.TRIGGER_BASED)).toThrow();
    expect(() => adaptSessionTime(SESSION_VALUES.INACTIVE)).toThrow();
  });
  test("Should return correct hours and minutes", () => {
    expect(adaptSessionTime(SESSION_TIME_VALUES.ONE_MINUTE)).toEqual({
      hours: 0,
      minutes: 1,
    });
    expect(adaptSessionTime(SESSION_TIME_VALUES.ONE_HOUR)).toEqual({
      hours: 1,
      minutes: 0,
    });
    expect(adaptSessionTime(SESSION_TIME_VALUES.ONE_HOUR_ONE_MINUTE)).toEqual({
      hours: 1,
      minutes: 1,
    });
    expect(adaptSessionTime(SESSION_TIME_VALUES.ONE_AND_HALF_HOUR)).toEqual({
      hours: 1,
      minutes: 30,
    });
  });
});
