"use client";
import { useState, useEffect } from "react";

export default function useLocalStorage(initialValue, key) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const storedValue = window.localStorage.getItem(key);
    if (storedValue) {
      setState(JSON.parse(storedValue));
    }
  }, [key]);

  useEffect(() => {
    if (state !== undefined) {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [state, key]);

  return [state, setState];
}
