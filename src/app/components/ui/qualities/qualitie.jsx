import React from "react";
import PropTypes from "prop-types";
// import { useQualities } from "../../../hooks/useQualities";

// const Qualitie = ({ color, _id, name }) => {
const Qualitie = ({ _id, color, name }) => {
    // const { getQuality } = useQualities();
    // console.log(useQualities());
    // const { color, _id, name } = getQuality(id);
    // console.log("getQuality(id): ", getQuality(id));

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
    // id: PropTypes.string,
};

export default Qualitie;
