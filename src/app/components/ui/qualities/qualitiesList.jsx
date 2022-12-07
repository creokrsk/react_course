import React, { useEffect } from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus,
    loadQualitiesList,
} from "../../../store/qualities";

const QualitiesList = ({ qualities }) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getQualitiesLoadingStatus());
    if (!isLoading) {
        const qualitiesList = useSelector(getQualitiesByIds(qualities));
        useEffect(() => {
            dispatch(loadQualitiesList());
        }, []);
        // console.log(qualities);

        return (
            <>
                {/* {qualities
                    ? qualities.map((_id) => <Qualitie key={_id} id={_id} />)
                    : []} */}
                {qualitiesList.map((qual) => (
                    <Qualitie key={qual._id} {...qual} />
                ))}
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
