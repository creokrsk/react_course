import React, { useEffect, useState } from "react";
import Qualities from "../../ui/qualities";
import api from "../../../api/index";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    }, []);

    // const handleGoToAllUsers = () => {
    //     history.push("/users");
    // };
    const handleGoToAllUsers = () => {
        history.push(history.location.pathname + "/edit");
    };

    return (
        <>
            {user ? (
                <>
                    <h1>{user.name}</h1>
                    <h3>Профессия: {user.profession.name}</h3>
                    <div>
                        <Qualities qualities={user.qualities} />
                    </div>
                    <div>Completed Meetings: {user.completedMeetings}</div>
                    <h3>Rate: {user.rate}</h3>
                    <button
                        className="btn btn-warning"
                        onClick={() => {
                            handleGoToAllUsers();
                        }}
                    >
                        Изменить
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

UserPage.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default UserPage;
