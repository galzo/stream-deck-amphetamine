import { describe } from "node:test";
import { expect, test } from "vitest";
import { isInfiniteSession, isSessionActive } from "../amphetamine-session";

const SESSION_VALUES = {
  INACTIVE: -3,
  INVALID: -15,
  VALID: 15,
  INFINITE: 0,
  APP_BASED: -1,
  TRIGGER_BASED: -2,
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
