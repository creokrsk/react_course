import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import api from "../../../api/index";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchString from "../../ui/searchString";

const UsersListPage = () => {
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
    const [searchData, setSearchData] = useState("");

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            setProfessions(data);
        });
        // console.log("change current page");
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchData]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchData("");
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    // const [filteredUsers, setFilteredUsers] = useState(users);

    const handleSearch = ({ target }) => {
        console.log(target.value);
        setSearchData(target.value);
        setSelectedProf();
    };

    if (persons) {
        const filteredPersons = selectedProf
            ? persons.filter(
                  (person) =>
                      JSON.stringify(person.profession) ===
                      JSON.stringify(selectedProf)
              )
            : persons;

        const searchedFilteredPersons = filteredPersons.filter((person) =>
            person.name.toLowerCase().includes(searchData.toLowerCase())
        );

        const sortedPersons = _.orderBy(
            // filteredPersons,
            searchedFilteredPersons,
            [sortBy.path],
            [sortBy.order]
        );

        const personCrop = paginate(sortedPersons, currentPage, pageSize);
        // const count = filteredPersons.length;
        const count = searchedFilteredPersons.length;

        const clearFilter = () => {
            setSelectedProf();
        };

        // console.log(personCrop);

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

                    {count > 0 && (
                        <>
                            <SearchString
                                value={searchData}
                                onChange={handleSearch}
                            />
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
                        </>
                    )}
                </div>
            </div>
        );
    }
    return <h2>Loading</h2>;
};

UsersListPage.propTypes = {
    persons: PropTypes.array,
    onDel: PropTypes.func,
    onAddToFavorites: PropTypes.func,
    onAddToFav: PropTypes.func,
};

export default UsersListPage;
