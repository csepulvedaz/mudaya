import { gql } from "@apollo/client";

export const CREATE_USER = gql`
    mutation CreateUser($input: userInput!) {
        createUser(input: $input) {
            _id
            name
            surname
            phone
            email
            password
        }
    }
`;

export const CREATE_DRIVER = gql`
    mutation createDriver($input: driverInput!) {
        createDriver(input: $input) {
            _id
            name
            surname
            phone
            email
            password
        }
    }
`;

export const CREATE_VEHICLE = gql`
    mutation CreateVehicle($input: vehicleInput!) {
        createVehicle(input: $input) {
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
