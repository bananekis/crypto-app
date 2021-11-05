export const color = {
  oceanBlue: "rgb(0, 21, 41)",
  white: "#fff",
  black: "#000",
  ghostWhite: "#00000012",
  blue: "#1890ff",
  grey: "#00000091",
};

export const baseUrl = process.env.REACT_APP_CRYPTOS_BASE_URL;
export const baseUrlNews = process.env.REACT_APP_NEWS_URL;

export const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_CRYPTO_HOST,
  "x-rapidapi-key": process.env.REACT_APP_CRYPTO_API_KEY,
};

export const cryptoNewsHeaders = {
  "x-bingapis-sdk": "true",
  "x-rapidapi-host": process.env.REACT_APP_NEWS_HOST,
  "x-rapidapi-key": process.env.REACT_APP_NEWS_API_KEY,
};
