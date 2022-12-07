import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams, Redirect } from "react-router-dom";
import UserEditPage from "../components/page/userEditPage";
import UseProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const { currentUser } = useAuth();

    return (
        <>
            <UseProvider>
                {userId ? (
                    edit ? (
                        userId === currentUser._id ? (
                            <UserEditPage />
                        ) : (
                            <Redirect to={`/users/${currentUser._id}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UseProvider>
        </>
    );
};

export default Users;
