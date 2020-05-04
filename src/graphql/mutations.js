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

export const UPDATE_USER = gql`
    mutation UpdateUser($input: updateUserInput!) {
        updateUser(input: $input) {
            name
            surname
            _id
            phone
        }
    }
`;

export const UPDATE_DRIVER = gql`
    mutation UpdateDriver($input: updateDriverInput!) {
        updateDriver(input: $input) {
            name
            surname
            _id
            phone
        }
    }
`;

export const CREATE_SERVICE = gql`
    mutation CreateService($input: serviceInput!) {
        createService(input: $input) {
            date
            origin
            destination
            commentaryUser
            state
            idUser
            idDriver
            idVehicle
        }
    }
`;

export const UPDATE_SERVICE = gql`
    mutation updateService($_id: ID!, $input: serviceDriverResponseInput!) {
        updateService(_id: $_id, input: $input) {
            origin
            destination
            commentaryUser
            state
        }
    }
`;
