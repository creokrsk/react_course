import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Main from "./layouts/main";
// import api from "./api";
// import Users from "./components/users";
import NavBar from "./layouts/navBar";
import NotFound from "./layouts/notFound";
import UsersOutput from "./layouts/usersOutput";
import UserOutput from "./layouts/userOutput";

function App() {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId" exact component={UserOutput} />
                <Route path="/users" component={UsersOutput} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
        </div>
    );
}

export default App;
