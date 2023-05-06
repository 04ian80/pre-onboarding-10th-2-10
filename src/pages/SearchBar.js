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
        {keyword && (
          <SuggestionList
            keyword={keyword}
            suggestions={suggestions}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
          />
        )}
      </div>
    </>
  );
};
export default SearchBar;
