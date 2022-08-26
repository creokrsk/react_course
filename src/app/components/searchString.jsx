import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchString = ({ users }) => {
    const [data, setData] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleChange = ({ target }) => {
        // console.log(target.value);
        setData(target.value);
    };

    const handleFind = (e) => {
        e.preventDefault();
        console.log("data: ", data);
        //     setFilteredUsers((prevState) =>
        //         prevState.filter((el) => el.name !== data)
        //     );
        setFilteredUsers();
    };

    console.log(filteredUsers);

    return (
        <form onSubmit={handleFind}>
            <input
                id="search"
                type="search"
                name="search"
                placeholder="Search..."
                value={data}
                onChange={handleChange}
            />
            <button>Search</button>
        </form>
    );
};

SearchString.propTypes = {
    users: PropTypes.array.isRequired,
};

export default SearchString;
