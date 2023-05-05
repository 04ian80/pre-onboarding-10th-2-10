import { apiClient } from '../apis/apiClient';

const EXPIRE_TIME = 1000 * 60 * 60; // 1 hour

const isExpired = (cached) => new Date().getTime() > cached.expireTime;

const removeCachedItem = (keyword) => localStorage.removeItem(keyword);

export const setCachedItem = (keyword, data) => {
  const cacheObject = {
    data,
    expireTime: new Date().getTime() + EXPIRE_TIME,
  };
  localStorage.setItem(keyword, JSON.stringify(cacheObject));
};

export const fetchSuggestions = async (keyword, setSuggestions) => {
  if (keyword.trim() === '') {
    setSuggestions([]);
    return;
  }

  try {
    const { data } = await apiClient.getKeyword(keyword);
    console.info('calling api');
    setCachedItem(keyword, data);
    setSuggestions(data);
  } catch (error) {
    console.error(error);
  }
};

export const renderCachedItem = (keyword, setSuggestions) => {
  const cachedItem = localStorage.getItem(keyword);
  if (cachedItem) {
    const parsedCache = JSON.parse(cachedItem);
    if (!isExpired(parsedCache)) {
      setSuggestions(parsedCache.data);
      return;
    }
    removeCachedItem(keyword);
  }
  fetchSuggestions(keyword, setSuggestions);
};
