const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

const getCachedData = (key: any) => {
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    const { data, timestamp } = JSON.parse(cachedData);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  return null;
};

const setCachedData = (key: any, data: any) => {
  const cacheItem = JSON.stringify({
    data,
    timestamp: Date.now(),
  });
  localStorage.setItem(key, cacheItem);
};
