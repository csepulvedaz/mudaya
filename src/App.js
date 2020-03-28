import React, { useState } from "react";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

console.log(process.env.REACT_APP_GOOGLE_API_KEY)

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Router>
            <Redirect to="/" />
            <Switch>
                <Route exact path="/">
                    <Login
                        setEmail={setEmail}
                        setPassword={setPassword}
                        email={email}
                        password={password}
                    />
                </Route>
                <Route path="/principal">
                    <Main />
                </Route>
                <Route path="/registro">
                    <Signin />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
