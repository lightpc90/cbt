"use client";

import { useState, useEffect } from "react";

function isObjectWithKeyValue(
  value: unknown
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.keys(value).length > 0 &&
    !Array.isArray(value)
  );
}

function isJsonString(value: unknown): boolean {
  if (typeof value !== "string") {
    return false;
  }

  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "object" && parsed !== null;
  } catch (err) {
    return false;
  }
}

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (arg: T) => void] {
  // check the code executing enviroment if it is client
  const isClient = typeof window !== "undefined";

  //   retrieve the existing value or initialize it if none exists: assuming the value stored is an object
  const [storedValue, setStoredValue] = useState(() => {
    if (isClient) {
      const item = localStorage.getItem(key);
      // if item does not exist
      if (item === null || item === undefined) {
        return initialValue;
      }
      // if item exists, check if it's json or string
      if (isJsonString(item)) {
        return JSON.parse(item);
      } else if (isJsonString(item) === false && typeof item === "string") {
        return item;
      } else {
        return new Error("value trying to fetch is neither string nor object");
      }
    }
  });
  //   update the stored value: assuming the value to be saved is an object
  useEffect(() => {
    if (isClient) {
      // if the storedValue is an object
      if (isObjectWithKeyValue(storedValue)) {
        localStorage.setItem(key, JSON.stringify(storedValue));
      } else if (typeof storedValue === "string") {
        localStorage.setItem(key, storedValue);
      }
    }
  }, [storedValue, key, isClient]);
  //  setValue function
  const setValue = (value: T) => {
    setStoredValue(value);
  };
  return [storedValue, setValue];
}
