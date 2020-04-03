import React from "react";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import VehicleForm from "./pages/VehicleForm";
import Profile from "./pages/Profile";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    // Redirect
} from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login />
                </Route>
                <Route path="/principal">
                    <Main />
                </Route>
                <Route path="/registro">
                    <Signin />
                </Route>
                <Route path="/vehiculo">
                    <VehicleForm />
                </Route>
                <Route path="/perfil">
                    <Profile/>
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
