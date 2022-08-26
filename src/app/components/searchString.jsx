import React from "react";
import PropTypes from "prop-types";

const SearchString = ({ value, onChange }) => {
    return (
        <>
            <input
                id="search"
                type="search"
                name="search"
                placeholder="Search..."
                value={value}
                onChange={onChange}
            />
        </>
    );
};

SearchString.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default SearchString;
