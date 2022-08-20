import React, { useEffect, useState } from "react";
import QualitiesList from "./qualitiesList";
import api from "../api/index";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserCard = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    const handleGoToAllUsers = () => {
        history.push("/users");
    };

    return (
        <>
            {user ? (
                <>
                    <h1>{user.name}</h1>
                    <h3>Профессия: {user.profession.name}</h3>
                    <div>
                        <QualitiesList qualities={user.qualities} />
                    </div>
                    <div>Completed Meetings: {user.completedMeetings}</div>
                    <h3>Rate: {user.rate}</h3>
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            handleGoToAllUsers();
                        }}
                    >
                        Все пользователи
                    </button>
                </>
            ) : (
                <div>
                    <h3>Loading...</h3>
                </div>
            )}
        </>
    );
};

UserCard.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserCard;
