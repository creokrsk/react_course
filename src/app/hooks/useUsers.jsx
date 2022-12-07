import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import userService from "../services/user.service";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";

const UserContext = React.createContext();

export const useUser = () => {
    return useContext(UserContext);
};

const UseProvider = ({ children }) => {
    const [persons, setPersons] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);
    useEffect(() => {
        if (!isLoading) {
            const newUsers = [...persons];
            const indexUser = newUsers.findIndex(
                (u) => u._id === currentUser._id
            );
            newUsers[indexUser] = currentUser;
            setPersons(newUsers);
        }
    }, [currentUser]);

    async function getUsers() {
        try {
            const { content } = await userService.get();
            // console.log(content);
            setPersons(content);
            setIsLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        // setIsLoading(false);
    }

    function getUserById(userId) {
        return persons.find((u) => u._id === userId);
    }

    return (
        <UserContext.Provider value={{ persons, getUserById }}>
            {!isLoading ? children : "LOading..."}
        </UserContext.Provider>
    );
};

UseProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default UseProvider;
