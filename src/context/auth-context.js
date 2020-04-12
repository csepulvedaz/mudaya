import { createContext } from "react";

export default createContext({
    client: null,
    token: null,
    userId: null,
    login: (client, token, userId, tokenExpiration) => {},
    logout: () => {},
});
