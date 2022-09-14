import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    // const { length } = props;

    if (length === 0) {
        return (
            <h1>
                <span className="badge bg-danger">
                    Никто с тобой не тусанёт
                </span>
            </h1>
        );
    } else if (length === 1) {
        return (
            <h1>
                <span className="badge bg-primary">
                    {length} человек тусанёт с тобой сегодня
                </span>
            </h1>
        );
    } else if (length < 5) {
        return (
            <h1>
                <span className="badge bg-primary">
                    {length} человека тусанут с тобой сегодня
                </span>
            </h1>
        );
    } else if (length >= 5) {
        return (
            <h1>
                <span className="badge bg-primary">
                    {length} человек тусанёт с тобой сегодня
                </span>
            </h1>
        );
    }
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired,
};

export default SearchStatus;
