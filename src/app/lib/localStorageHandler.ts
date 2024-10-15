/* eslint-disable @typescript-eslint/no-explicit-any */
type TLoadedResponse = {
  data: any;
  error?: boolean;
  errorMessage?: string;
};

/**
 * save data to local storage
 * @param key key to save in local storage
 * @param value It should be a valid JSON string
 */
export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

/**
 * load data from local storage
 * @param key key to load from local storage
 * @returns TLoadedResponse
 */
export const loadFromLocalStorage = (key: string): TLoadedResponse => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return {
        data: JSON.parse(value),
        error: false,
      };
    } else {
      throw {
        data: null,
        error: true,
        errorMessage: "No data found in local storage",
      };
    }
  } catch (e) {
    console.error(e);
    return { data: null, error: true, errorMessage: (e as Error).message };
  }
};
