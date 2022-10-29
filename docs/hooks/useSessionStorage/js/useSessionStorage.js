import { useState } from 'react';

const useSessionStorage = (key, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.sessionStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      return defaultValue;
    }
  });

  const setValue = (newValue) => {
    try {
      window.sessionStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {}
    setStoredValue(newValue);
  };

  return [storedValue, setValue];
};

export default useSessionStorage;
