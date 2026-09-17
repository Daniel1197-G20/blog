"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/hooks/redux";
import { getCurrentUserRequest } from "@/store/slices/authSlice";
import { setAuthToken } from "@/lib/api";

export default function AuthSession() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("forestblog_token");
    if (token) {
      setAuthToken(token);
      dispatch(getCurrentUserRequest(token));
    }
  }, [dispatch]);

  return null;
}
