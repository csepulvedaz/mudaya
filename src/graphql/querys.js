import { gql } from "@apollo/client";

export const ALL_USERS = gql`
    {
        Users {
            _id
            name
            surname
            phone
            email
            password
        }
    }
`;

export const LOGIN = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;
