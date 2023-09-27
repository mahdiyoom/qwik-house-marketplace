export const baseUrl = "https://strapi-demo-app-217n.onrender.com";

export const fetchApi = async (url) => {
  const response = await fetch(url);
  const { data } = await response.json();

  return data;
};
