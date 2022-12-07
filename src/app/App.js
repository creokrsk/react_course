import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
// import api from "./api";
// import Users from "./components/users";
import NavBar from "./components/ui/navBar";
import NotFound from "./layouts/notFound";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";
import { loadProfessionsList } from "./store/professions";

function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        exact
                        component={Users}
                    />
                    <Route path="/404" component={NotFound} />
                    <Redirect to="/404" />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
