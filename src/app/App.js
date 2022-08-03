import React, { useState, useEffect } from "react";
import api from "./api";
import Users from "./components/users";

function App() {
    // const [person, setPerson] = useState(api.users.fetchAll());

    const [person, setPerson] = useState();

    useEffect(() => {
        api.users.fetchAll().then((data) => {
            setPerson(data);
        });
    }, []);

    const handleDelBtn = (userId) => {
        setPerson((prevState) => prevState.filter((el) => el._id !== userId));
    };

    const handleBookmarkBtn = (userId) => {
        setPerson((prevState) =>
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

    return (
        <>
            {person && (
                <Users
                    persons={person}
                    onDel={handleDelBtn}
                    onAddToFavorites={handleBookmarkBtn}
                />
            )}
        </>
    );
}

export default App;
