import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

export const SearchInput = ({ searchTweetAction, initValue = "", testID }) => {
  const queryInputRef = useRef(null);

  const [queryValue, setQueryValue] = useState(initValue);
  const [error, setError] = useState(initValue.length < 3);

  const clickHandler = (e) => {
    e.preventDefault();
    if (searchTweetAction && queryValue.length > 2) {
      searchTweetAction(queryValue);
    }
  };

  const changeHandler = (e) => {
    e.preventDefault();
    const query = queryInputRef.current.value;
    if (query.length > 2) {
      setError(false);
    } else {
      setError(true);
    }
    setQueryValue(query);
  };

  return (
    <>
      <input
        value={queryValue}
        className={error ? "error" : undefined}
        ref={queryInputRef}
        onChange={changeHandler}
        onKeyUp={changeHandler}
        data-testid={testID}
      />
      <button
        disabled={error}
        onClick={clickHandler}
        data-testid={`${testID}-button`}
      >
        Search
      </button>
      <div
        className={error ? "error" : undefined}
        data-testid={`${testID}-error-text`}
      >
        Search criteria must have more 3 characters or more.
      </div>
    </>
  );
};

SearchInput.propTypes = {
  searchTweetAction: PropTypes.func,
  initValue: PropTypes.string,
};
