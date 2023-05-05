import { useState, useEffect } from 'react';
import { fetchSuggestions, renderCachedItem } from '../utils/helpSuggestions';

const useKeywordSuggestion = (keyword) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (localStorage.getItem(keyword)) {
      renderCachedItem(keyword, setSuggestions);
      return;
    }

    const timer = setTimeout(() => {
      fetchSuggestions(keyword, setSuggestions);
    }, 200);
    return () => clearTimeout(timer);
  }, [keyword]);

  return [suggestions];
};

export default useKeywordSuggestion;
