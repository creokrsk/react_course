import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionsLoadingStatus,
} from "../../store/professions";

const Profession = ({ id }) => {
    // const { isLoading, getProfession } = useProfessions();
    const isLoading = useSelector(getProfessionsLoadingStatus());
    const prof = useSelector(getProfessionById(id));
    // console.log(prof);
    if (!isLoading) {
        return <p>{prof.name}</p>;
    } else {
        return "Lodaing...";
    }
};

Profession.propTypes = {
    id: PropTypes.string,
};

export default Profession;
