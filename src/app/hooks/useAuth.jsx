import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import userService from "../services/user.service";
// import userService from "../services/user.service";
import { toast } from "react-toastify";
import localStorageService, {
    setTokens,
    getAccessToken,
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";

export const httpAuth = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/",
    params: {
        key: process.env.REACT_APP_FIREBASE_KEY,
    },
});
const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const history = useHistory();

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    const randomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    async function signUp({ email, password, ...rest }) {
        // const keyFireBasePrivate = "AIzaSyAPP-Ks5UtgVhJLaz7hwJalPa7q7CS4yrM";
        // const url = `accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(`accounts:signUp`, {
                email,
                password,
                returnSecureToken: true,
            });

            setTokens(data);
            await createUser({
                _id: data.localId,
                email,
                rate: randomInt(0, 5),
                completedMeetings: randomInt(0, 200),
                image: `https://avatars.dicebear.com/api/avataaars/${(
                    Math.random() + 1
                )
                    .toString(36)
                    .substring(7)}.svg`,
                ...rest,
            });
            // console.log(data);
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_EXISTS") {
                    const errorObject = {
                        email: "Пользователь с таким Email уже существует",
                    };
                    throw errorObject;
                }
            }
            // throw new Error();
        }
    }

    async function signIn({ email, password }) {
        try {
            const { data } = await httpAuth.post(
                `accounts:signInWithPassword`,
                {
                    email,
                    password,
                    returnSecureToken: true,
                }
            );

            setTokens(data);
            await getUserData();
        } catch (error) {
            errorCatcher(error);
            const { code, message } = error.response.data.error;
            console.log(code, message);
            if (code === 400) {
                if (message === "EMAIL_NOT_FOUND") {
                    const errorObject = {
                        email: "Пользователь с таким Email не зарегистрирован",
                    };
                    throw errorObject;
                } else if (message === "INVALID_PASSWORD") {
                    const errorObject = {
                        password: "Введёный вами пароль некорректен",
                    };
                    throw errorObject;
                }
            }
            // throw new Error();
        }
    }

    function logOUt() {
        localStorageService.removeAuthData();
        setUser(null);
        history.push("/");
    }

    async function createUser(data) {
        try {
            const { content } = await userService.create(data);
            console.log(content);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    async function getUserData() {
        try {
            const { content } = await userService.getCurrentUser();
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }

    async function updateUser({ _id, email, password, ...rest }) {
        try {
            const { data } = await httpAuth.post("account:update", {
                idToken: getAccessToken(),
                email,
                password,
                returnSecureToken: true,
            });
            const userData = { _id, email, ...rest };
            await updateCurrUser(userData);
            return data;
        } catch (error) {
            errorCatcher(error);
        } finally {
            setIsLoading(false);
        }
    }
    async function updateCurrUser(data) {
        try {
            const { content } = await userService.update(data);
            setUser(content);
        } catch (error) {
            errorCatcher(error);
        }
    }

    useEffect(() => {
        if (localStorageService.getAccessToken()) {
            getUserData();
        } else {
            setIsLoading(false);
        }
    }, []);

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }
    return (
        <AuthContext.Provider
            value={{ signUp, signIn, logOUt, currentUser, updateUser }}
        >
            {!isLoading ? children : "Loading"}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default AuthProvider;
