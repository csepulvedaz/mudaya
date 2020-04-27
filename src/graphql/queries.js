import { gql } from "@apollo/client";

export const PROFILEUSER = gql`
    query ProfileUser($_id: String!) {
        profileUser(_id: $_id) {
            name
            surname
            email
            _id
            phone
        }
    }
`;

export const PROFILEDRIVER = gql`
    query ProfileDriver($_id: String!) {
        profileDriver(_id: $_id) {
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
        vehicles(type: $type) {
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
