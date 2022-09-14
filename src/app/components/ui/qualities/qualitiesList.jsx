import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Qualitie
                    key={qual._id}
                    color={qual.color}
                    _id={qual._id}
                    name={qual.name}
                />
            ))}
        </>
    );
};
QualitiesList.propTypes = {
    qualities: PropTypes.array,
};

export default QualitiesList;
