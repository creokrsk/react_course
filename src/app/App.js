import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
// import api from "./api";
// import Users from "./components/users";
import NavBar from "./components/ui/navBar";
import NotFound from "./layouts/notFound";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

function App() {
    return (
        <div>
            <AuthProvider>
                <NavBar />
                <ProfessionProvider>
                    <QualitiesProvider>
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
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    );
}

export default App;
