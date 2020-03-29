import React, { useState } from "react";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import VehicleForm from "./pages/VehicleForm";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

console.log(process.env.REACT_APP_GOOGLE_API_KEY);

const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const [isDriver, setIsDriver] = useState(false);

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Login setEmail={setEmail} setPassword={setPassword} />
                </Route>
                <Route path="/principal">
                    <Main />
                </Route>
                <Route path="/registro">
                    <Signin
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setName={setName}
                        setSurname={setSurname}
                        setId={setId}
                        setPhone={setPhone}
                        setIsDriver={setIsDriver}
                        isDriver={isDriver}
                    />
                </Route>
                <Route path="/vehiculo">
                    <VehicleForm />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
