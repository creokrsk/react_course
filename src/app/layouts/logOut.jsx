import React, { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
    const { logOUt } = useAuth();

    useEffect(() => {
        logOUt();
    }, []);
    return <h1>LogOuting...</h1>;
};

export default LogOut;
