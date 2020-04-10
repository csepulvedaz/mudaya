import React, { useState } from "react";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import VehicleForm from "./pages/VehicleForm";
import Profile from "./pages/Profile";
import AuthContext from "./context/auth-context";
import NotFound404 from "./pages/NotFound404";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

const App = () => {
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const login = (token, userId, tokenExpiration) => {
        setToken(token);
        setUserId(userId);
    };
    const logout = () => {
        setToken(null);
        setUserId(null);
    };
    return (
        <Router>
            <AuthContext.Provider
                value={{
                    token: token,
                    userId: userId,
                    login: login,
                    logout: logout,
                }}
            >
                <Switch>
                    {!token && <Redirect from="/principal" to="/" exact />}
                    {!token && <Redirect from="/perfil" to="/" exact />}
                    {token && <Redirect from="/" to="/principal" exact />}
                    {!token && (
                        <Route exact path="/">
                            <Login />
                        </Route>
                    )}
                    {token && (
                        <Route path="/principal">
                            <Main />
                        </Route>
                    )}
                    <Route path="/registro">
                        <Signin />
                    </Route>
                    <Route path="/vehiculo">
                        <VehicleForm />
                    </Route>
                    {token && (
                        <Route path="/perfil">
                            <Profile />
                        </Route>
                    )}
                    <Route path="*" component={NotFound404} />
                </Switch>
            </AuthContext.Provider>
        </Router>
    );
};

export default App;
