import React from "react";
import PropTypes from "prop-types";

const Qualitie = ({ color, _id, name }) => {
    const getColor = (color) => {
        let classes = "badge bg-";
        classes += String(color);
        return classes;
    };

    return (
        <span style={{ marginRight: 10 }} key={_id} className={getColor(color)}>
            {name}
        </span>
    );
};

Qualitie.propTypes = {
    color: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default Qualitie;
