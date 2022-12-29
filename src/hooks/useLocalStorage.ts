import { useState, useEffect } from "react";

const PREFIX = "chat-app-";

export default function useLocalStorage(
  key: string,
  initialValue: unknown = ""
) {
  const keyCombined = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(keyCombined);
    if (jsonValue !== null) return JSON.parse(jsonValue);
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(keyCombined, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
