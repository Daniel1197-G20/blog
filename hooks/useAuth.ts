import { useAppSelector } from "./redux";
import { selectAuthState } from "@/store/selectors/authSelectors";
import type { AuthState } from "@/types";

export type { AuthState };

export function useAuth(): AuthState {
  return useAppSelector(selectAuthState);
}

export default useAuth;
