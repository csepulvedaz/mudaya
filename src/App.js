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

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [identification, setIdentification] = useState("");
    const [phone, setPhone] = useState("");

    const [driver, setDriver] = useState(false);

    return (
        <Router>
            <Redirect to="/registro" />
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
                    <Signin 
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setFirstName={setFirstName}
                        setSurName={setSurName}
                        setIdentification={setIdentification}
                        setPhone={setPhone}
                        setDriver={setDriver}
                    />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
