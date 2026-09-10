/** Bump in env (SESSION_EPOCH) to force one clean re-login after auth deploys. */
export function getSessionEpoch(): string {
  return process.env.SESSION_EPOCH?.trim() || "5"
}

export const SESSION_EPOCH_COOKIE = "session_epoch"
