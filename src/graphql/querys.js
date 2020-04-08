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
