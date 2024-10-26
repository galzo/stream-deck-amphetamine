export type AppleScriptSuccessRun = { isSuccess: true; result: string };
export type AppleScriptFailedRun = { isSuccess: false; error: string };
export type AppleScriptRunResult = AppleScriptSuccessRun | AppleScriptFailedRun;
