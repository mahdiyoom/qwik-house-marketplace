export const baseUrl = "https://real-state-db.onrender.com";

export const fetchApi = async (url) => {
  const response = await fetch(url);
  const { data } = await response.json();

  return data;
};
