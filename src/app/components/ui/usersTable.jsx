import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
// import QualitiesList from "../components/ui/qualities/qualitiesList";
import Qualities from "../ui/qualities";
import Table, { TableHeader, TableBody } from "../common/table";
import { Link } from "react-router-dom";
import Profession from "./profession";

const UserTable = ({
    users,
    onSort,
    selectedSort,
    onClickBookmark,
    onClick,
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            ),
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />,
        },
        professions: {
            name: "Профессия",
            component: (user) => <Profession id={user.profession} />,
        },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз",
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    addededToFavorites={user.bookmark}
                    onAddToFav={onClickBookmark}
                    userId={user._id}
                />
            ),
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onClick(user._id)}
                >
                    delete
                </button>
            ),
        },
    };
    return (
        <>
            <Table
                selectedSort={selectedSort}
                onSort={onSort}
                columns={columns}
                data={users}
            >
                <TableHeader {...{ onSort, selectedSort, columns }} />
                <TableBody {...{ columns, data: users }} />
            </Table>
            {/* <TableHeader
                selectedSort={selectedSort}
                onSort={onSort}
                columns={columns}
            /> */}
            {/* <TableBody columns={columns} data={users} /> */}
            {/* <tbody>
                <>
                    {users.map((el) => (
                        <tr key={el._id}>
                            <User
                                user={el}
                                onClick={onDel}
                                onClickBookmark={onAddToFavorites}
                                key={el._id}
                            />
                        </tr>
                    ))}
                </>
            </tbody> */}
        </>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    // onDel: PropTypes.func.isRequired,
    // onAddToFavorites: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onClickBookmark: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default UserTable;
