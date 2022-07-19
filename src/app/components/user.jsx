import React from "react";
import Qualitie from "./qualitie";
import Bookmark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onClick, onClickBookmark }) => {
    // console.log(user.bookmark);
    return (
        <>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((qual) => (
                    <Qualitie
                        key={qual._id}
                        color={qual.color}
                        _id={qual._id}
                        name={qual.name}
                    />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate}</td>
            <td>
                <Bookmark
                    addededToFavorites={user.bookmark}
                    onAddToFav={onClickBookmark}
                    userId={user._id}
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onClick(user._id)}
                >
                    delete
                </button>
            </td>
        </>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    onClickBookmark: PropTypes.func.isRequired,
};

export default User;
