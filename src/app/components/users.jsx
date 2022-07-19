import React, { useState } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import PropTypes from "prop-types";

const Users = ({ persons, onDel, onAddToFavorites }) => {
    const count = persons.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (pageIndex) => {
        console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const personCrop = paginate(persons, currentPage, pageSize);

    // console.log(personCrop);

    if (count === 0) {
        return <SearchStatus length={count} />;
    }
    return (
        <>
            <SearchStatus length={count} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <>
                        {/* {persons.map((el) => (
              <tr key={el._id}>
                <User user={el} onClick={onDel} onClickBookmark={onAddToFavorites} />
              </tr>
            ))} */}
                        {personCrop.map((el) => (
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
                </tbody>
            </table>

            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    persons: PropTypes.array.isRequired,
    onDel: PropTypes.func.isRequired,
    onAddToFavorites: PropTypes.func.isRequired,
};

export default Users;
