import React, { useState, useEffect } from "react";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import SearchStatus from "../../ui/searchStatus";
import PropTypes from "prop-types";
import GroupList from "../../common/groupList";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import SearchString from "../../ui/searchString";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    // const [persons, setPersons] = useState();
    // const { users } = useUser();
    const { persons } = useUser();
    const { currentUser } = useAuth();
    // console.log(persons);

    const handleDelBtn = (userId) => {
        // setPersons((prevState) => prevState.filter((el) => el._id !== userId));
        console.log(userId);
    };

    const handleBookmarkBtn = (userId) => {
        const newArray = persons.map((el) => {
            if (el._id === userId) {
                // console.log(el._id, userId);
                return { ...el, bookmark: !el.bookmark };
            } else {
                // console.log(el._id, userId);
                return el;
            }
        });
        console.log(newArray);
    };

    const pageSize = 8;
    const [currentPage, setCurrentPage] = useState(1);
    const { isLoading: professionsLoading, professions } = useProfessions();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iterator: "name", order: "asc" });
    // const [searchData, setSearchData] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
        setSearchQuery("");
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
        setSearchQuery(target.value);
        setSelectedProf();
    };

    if (persons) {
        function filterUsers(data) {
            const filteredPersons = searchQuery
                ? data.filter(
                      (person) =>
                          person.name
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) !== -1
                  )
                : selectedProf
                ? data.filter(
                      (person) =>
                          JSON.stringify(person.professions) ===
                          JSON.stringify(selectedProf)
                  )
                : data;
            return filteredPersons.filter((p) => p._id !== currentUser._id);
        }

        const filteredPersons = filterUsers(persons);
        const sortedPersons = _.orderBy(
            filteredPersons,
            // searchedFilteredPersons,
            [sortBy.path],
            [sortBy.order]
        );

        const personCrop = paginate(sortedPersons, currentPage, pageSize);
        // const count = filteredPersons.length;
        const count = filteredPersons.length;

        const clearFilter = () => {
            setSelectedProf();
        };

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
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
                                value={searchQuery}
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
