import { useState, useEffect } from "react";

const PREFIX = "codepen-clone-";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  /* Getting the value from Local Storage */

  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);

    /* return the parsed value of json if found in local storage */
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    }

    /* if not found in local storage then set it up with initial value */
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  /* Saving the value in local storage */
  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}
