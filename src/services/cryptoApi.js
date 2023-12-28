const apiKeys = "CG-a5CDoh4AgopC6qnjfDPvmpqq";
const baseURL = "https://api.coingecko.com/api/v3";
const getCoinList = (vs_currency, page) => {
  return `${baseURL}/coins/markets?vs_currency=${vs_currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${apiKeys}`;
};

const searchCoin = (text) => {
  return `${baseURL}/search?query=${text}&x_cg_demo_api_key=${apiKeys}`;
};

const marketChart = (coin) =>
  `${baseURL}/coins/${coin}/market_chart?vs_currency=usd&days=7&x_cg_demo_api_key=${apiKeys}`;
export { getCoinList, searchCoin, marketChart };
