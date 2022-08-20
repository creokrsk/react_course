import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import SearchStatus from "./searchStatus";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api/index";
import UserTable from "./usersTable";
import _ from "lodash";

const Users = () => {
    // const count = persons.length;

    // const [person, setPerson] = useState(api.users.fetchAll());

    const [persons, setPersons] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setPersons(data);
        });
    }, []);

    const handleDelBtn = (userId) => {
        setPersons((prevState) => prevState.filter((el) => el._id !== userId));
    };

    const handleBookmarkBtn = (userId) => {
        setPersons((prevState) =>
            prevState.map((el) => {
                if (el._id === userId) {
                    // console.log(el._id, userId);
                    return { ...el, bookmark: !el.bookmark };
                } else {
                    // console.log(el._id, userId);
                    return el;
                }
            })
        );
    };
    // App

    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iterator: "name", order: "asc" });

    useEffect(() => {
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
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    if (persons) {
        const filteredPersons = selectedProf
            ? persons.filter(
                  (person) =>
                      JSON.stringify(person.profession) ===
                      JSON.stringify(selectedProf)
              )
            : persons;

        const sortedPersons = _.orderBy(
            filteredPersons,
            [sortBy.path],
            [sortBy.order]
        );
        const personCrop = paginate(sortedPersons, currentPage, pageSize);
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
                    <UserTable
                        users={personCrop}
                        // onClick={onDel}
                        // onClickBookmark={onAddToFavorites}
                        // onAddToFav={onAddToFav}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onClick={handleDelBtn}
                        onClickBookmark={handleBookmarkBtn}
                    />
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
    }
    return <h2>Loading</h2>;
};

Users.propTypes = {
    persons: PropTypes.array,
    onDel: PropTypes.func,
    onAddToFavorites: PropTypes.func,
    onAddToFav: PropTypes.func,
};

export default Users;
