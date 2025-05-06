import { v4 } from "uuid";

const OPER_U_ID_LS_NAME = "operUid";

export function generateUUID() {
  return v4()
}

export function getUserClientId() {
  return localStorage.getItem(OPER_U_ID_LS_NAME);
}

export function setUserClientId() {
  const userClientId = getUserClientId();

  if (!userClientId) {
    localStorage.setItem(OPER_U_ID_LS_NAME,generateUUID());
  }
}
