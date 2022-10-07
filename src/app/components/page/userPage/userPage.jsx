import React, { useEffect, useState } from "react";
import api from "../../../api/index";
import PropTypes from "prop-types";
import UserCard from "../../ui/userCard";
import QualitiesCard from "../../ui/qualitiesCard";
import MeetingsCard from "../../ui/meetingsCard";
import Comments from "../../ui/comments";
// import { useHistory } from "react-router-dom";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    return (
        <>
            {user ? (
                <div className="container">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <UserCard user={user} />
                            <QualitiesCard data={user.qualities} />
                            <MeetingsCard value={user.completedMeetings} />
                        </div>
                        <div className="col-md-8">
                            <Comments />
                        </div>
                    </div>
                </div>
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
