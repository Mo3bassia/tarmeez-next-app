"use client";
import { useState, useEffect } from "react";

export default function useLocalStorage(initalValue, key) {
  const [state, setState] = useState(() =>
    !window.localStorage.getItem(key)
      ? initalValue
      : JSON.parse(window.localStorage.getItem(key))
  );

  useEffect(
    function () {
      window.localStorage.setItem(key, JSON.stringify(state));
    },
    [state]
  );
  return [state, setState];
}
