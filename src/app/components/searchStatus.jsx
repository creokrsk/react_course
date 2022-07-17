import React from 'react';

const SearchStatus = (props) => {
  const { length } = props;

  if (length === 0) {
    return (
      <h1>
        <span className="badge bg-danger">Никто с тобой не тусанёт</span>
      </h1>
    );
  } else if (length === 1) {
    return (
      <h1>
        <span className="badge bg-primary">{length} человек тусанёт с тобой сегодня</span>
      </h1>
    );
  } else if (length < 5) {
    return (
      <h1>
        <span className="badge bg-primary">{length} человека тусанут с тобой сегодня</span>
      </h1>
    );
  } else if (length >= 5) {
    return (
      <h1>
        <span className="badge bg-primary">{length} человек тусанёт с тобой сегодня</span>
      </h1>
    );
  }
};

export default SearchStatus;
