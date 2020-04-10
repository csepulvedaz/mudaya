import { gql } from "@apollo/client";

/*export const ALL_USERS = gql`
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
`;*/

export const PROFILE = gql`
    query ProfileUser($_id: Int!){
        profileUser(_id: $_id){
            name
            surname
            email
            _id
            phone
        }
    }
`;
