import React from "react";
import UserCard from "../components/userCard";
import { useParams } from "react-router-dom";

const UserOutput = () => {
    const params = useParams();
    const { userId } = params;

    console.log(userId);

    return (
        <>
            <UserCard userId={userId} />
        </>
    );
};

export default UserOutput;
