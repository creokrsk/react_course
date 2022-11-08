import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { setTokens } from "../services/localStorage.service";

const httpAuth = axios.create();
const LogInContext = React.createContext();

export const useLogIn = () => {
    return useContext(LogInContext);
};

const LogInProvider = ({ children }) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    async function signIn({ email, password }) {
        console.log(email, password);
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`;
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true,
            });

            setTokens(data);
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

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
    }

    return (
        <LogInContext.Provider value={{ signIn }}>
            {children}
        </LogInContext.Provider>
    );
};

LogInProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]),
};

export default LogInProvider;
