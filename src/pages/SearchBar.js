import React, { useState } from 'react';
import useKeywordSuggestion from '../hooks/useKeywordSuggestion';
import useInputChange from '../hooks/useInputChange';
import SearchBarInput from '../components/SearchBarInput';
import SuggestionList from '../components/SuggestionList';
import suggestKeyboardHandler from '../utils/suggestKeyboardHandler';

const SearchBar = () => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [keyword, handleInputChange, setKeyword] = useInputChange();
  const [suggestions] = useKeywordSuggestion(keyword);
  const handleKeyDown = suggestKeyboardHandler(
    suggestions,
    focusedIndex,
    setFocusedIndex,
    setKeyword
  );
  return (
    <>
      <SearchBarInput
        keyword={keyword}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      />
      <div className="suggestion-list__container">
        {suggestions.length > 0 ? (
          <SuggestionList
            keyword={keyword}
            suggestions={suggestions}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
          />
        ) : (
          keyword && (
            <div className="suggestion-list">
              <small>추천 검색어</small>
              <div className="suggestion_no-result">검색어 없음</div>
            </div>
          )
        )}
      </div>
    </>
  );
};
export default SearchBar;
