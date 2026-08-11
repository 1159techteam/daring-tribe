export function getSessionEpoch(): string {
  return process.env.SESSION_EPOCH?.trim() || "2"
}

export const SESSION_EPOCH_COOKIE = "session_epoch"
