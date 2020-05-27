import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
// import { createMemoryHistory } from "history";
// import { Router } from "react-router";

import App from "./App";
import AuthContext from "./context/auth-context";

// it("renders without crashing", () => {
//     const div = document.createElement("div");
//     render(<App />, div);
// });

test("AutContext provider pass client, token and userId", () => {
    const tree = (
        <AuthContext.Provider
            value={{
                client: "user",
                token: "123asd",
                userId: "123456789",
                login: (client, token, userId, tokenExpiration) => {},
                logout: () => {},
            }}
        >
            <AuthContext.Consumer>
                {(value) => (
                    <span>
                        Received: {value.client}, {value.token}, {value.userId}
                    </span>
                )}
            </AuthContext.Consumer>
        </AuthContext.Provider>
    );
    const { getByText } = render(tree);
    expect(getByText(/^Received:/).textContent).toBe(
        "Received: user, 123asd, 123456789"
    );
});

// test("Redirects to login page", () => {
//     const history = createMemoryHistory();
//     render(
//         <Router history={history}>
//             <App />
//         </Router>
//     );
//     expect(history.location.pathname).toBe("/");
// });
