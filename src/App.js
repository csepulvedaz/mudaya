import React, {useState} from "react";
import {ThemeProvider} from '@material-ui/core/styles';
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import VehicleForm from "./pages/VehicleForm";
import AuthContext from "./context/auth-context";
import NotFound404 from "./pages/NotFound404";
import Theme from "../src/components/utils/AppTheme";

import {BrowserRouter as Router, Redirect, Route, Switch,} from "react-router-dom";

const App = () => {
    const [client, setClient] = useState(null);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [thirdPartyInfo, setThirdPartyInfo] = useState({
        email: null,
        password: null,
        first_name: null,
        last_name: null
    });
    const [thirdPartyRegister, setThirdPartyRegister] = useState(false);

    const login = (client, token, userId, tokenExpiration) => {
        setClient(client);
        setToken(token);
        setUserId(userId);
    };

    const logout = () => {
        setClient(null);
        setToken(null);
        setUserId(null);
    };

    return (
        <Router>
            <AuthContext.Provider
                value={{
                    client: client,
                    token: token,
                    userId: userId,
                    login: login,
                    logout: logout,
                }}
            >
                <ThemeProvider theme={Theme}>
                <Switch>
                    {!token && <Redirect from="/principal" to="/" exact />}
                    {token && <Redirect from="/" to="/principal" exact />}
                    {token && client === "user" && (
                        <Redirect from="/registro" to="/principal" exact />
                    )}
                    {client === "driver" && (
                        <Redirect from="/registro" to="/vehiculo" exact />
                    )}
                    {client !== "driver" && (
                        <Redirect from="/vehiculo" to="/" exact />
                    )}
                    {thirdPartyRegister  && (
                        <Redirect from="/" to="/registro" exact />
                    )}
                    {!token && (
                        <Route exact path="/">
                            <Login setThirdPartyInfo={setThirdPartyInfo} setThirdPartyRegister={setThirdPartyRegister}/>
                        </Route>
                    )}
                    {token && (
                        <Route path="/principal">
                            <Main />
                        </Route>
                    )}
                    {!token && (
                        <Route path="/registro">
                            <Signin thirdPartyInfo={thirdPartyInfo} setThirdPartyRegister={setThirdPartyRegister}/>
                        </Route>
                    )}

                    <Route path="/vehiculo">
                        <VehicleForm />
                    </Route>

                    <Route path="*" component={NotFound404} />
                </Switch>
                </ThemeProvider>
            </AuthContext.Provider>
        </Router>
    );
};

export default App;
