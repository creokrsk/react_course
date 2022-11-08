import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities();
    // console.log(qualities);
    if (!isLoading) {
        return (
            <>
                {qualities
                    ? qualities.map((_id) => <Qualitie key={_id} id={_id} />)
                    : []}
            </>
        );
    } else {
        return "Loading...";
    }
};
QualitiesList.propTypes = {
    qualities: PropTypes.array,
};

export default QualitiesList;
