export const useLocalstorage = () => {
  const getData = (key: string) => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(key);
      if (data) {
        return JSON.parse(data);
      }
      return null;
    }
  };
  const setData = (key: string, value: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };

  const deleteData = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };
  return {
    getData,
    setData,
    deleteData,
  };
};

export default useLocalstorage;
