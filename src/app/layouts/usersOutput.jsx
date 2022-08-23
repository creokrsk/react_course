import React from "react";
import Users from "../components/users";
import UserCard from "../components/userCard";
import { useParams } from "react-router-dom";

const UsersOutput = () => {
    const params = useParams();
    const { userId } = params;

    return <>{userId ? <UserCard userId={userId} /> : <Users />}</>;
};

export default UsersOutput;
