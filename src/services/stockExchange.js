import stockExchangeData from "../data/ChatBotData.json";

const getRandomWaitingTime = () => {
  return Math.floor(Math.random() * 1500) + 500;
};

const getRandomPromiseFailure = () => {
  return Math.random() < 0.2;
};

const getStockData = async () => {
  return new Promise((resolve, reject) => {
    const waitingTime = getRandomWaitingTime();

    setTimeout(() => {
      const isPromiseFailing = getRandomPromiseFailure();
      if (isPromiseFailing) {
        return reject();
      }

      return resolve(stockExchangeData);
    }, waitingTime);
  });
};

export { getStockData };
