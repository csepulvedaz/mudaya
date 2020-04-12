import {gql} from "@apollo/client";

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
    query ProfileUser($_id: Int!) {
        profileUser(_id: $_id) {
            name
            surname
            email
            _id
            phone
        }
    }
`;

export const LOGIN = gql`
    query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            client
            userId
            token
            tokenExpiration
        }
    }
`;

export const ALL_VEHICLES = gql`
    query Vehicles($type: String) {
      Vehicles(type: $type) {
        _id
            brand
            model
            year
            type
            dimensions
            capacity
            commentary
            idDriver
      }
    }
`;