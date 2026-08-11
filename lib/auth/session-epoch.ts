export function getSessionEpoch(): string {
  return process.env.SESSION_EPOCH?.trim() || "3"
}

export const SESSION_EPOCH_COOKIE = "session_epoch"
