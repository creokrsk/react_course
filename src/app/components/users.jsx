import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import User from "./user";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api/index";

const Users = ({ persons, onDel, onAddToFavorites }) => {
    // const count = persons.length;

    const pageSize = 2;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    useEffect(() => {
        // console.log("send request");
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        // console.log("change current page");
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        // console.log(params);
    };

    // console.log(professions);

    const handlePageChange = (pageIndex) => {
        // console.log("page: ", pageIndex);
        setCurrentPage(pageIndex);
    };

    const filteredPersons = selectedProf
        ? persons.filter(
              (person) =>
                  JSON.stringify(person.profession) ===
                  JSON.stringify(selectedProf)
          )
        : persons;

    console.log(filteredPersons);
    const personCrop = paginate(filteredPersons, currentPage, pageSize);
    const count = filteredPersons.length;

    const clearFilter = () => {
        setSelectedProf();
    };

    // console.log(personCrop);

    if (count === 0) {
        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            valueProperty="_id"
                            contentProperty="name"
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Clear list
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                </div>
            </div>
        );
    }
    return (
        <div className="d-flex">
            {professions && (
                <div className="d-flex flex-column flex-shrink-0 p-3">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        valueProperty="_id"
                        contentProperty="name"
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Clear list
                    </button>
                </div>
            )}

            <div className="d-flex flex-column">
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
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

Users.propTypes = {
    persons: PropTypes.array.isRequired,
    onDel: PropTypes.func.isRequired,
    onAddToFavorites: PropTypes.func.isRequired,
};

export default Users;
