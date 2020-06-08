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

export const ACCEPT_SERVICE = gql`
    mutation AcceptService($_id: ID!) {
        acceptService(_id: $_id) {
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

export const CANCEL_SERVICE = gql`
    mutation CancelService($_id: ID!) {
        cancelService(_id: $_id) {
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

export const FINISH_SERVICE = gql`
    mutation FinishService($_id: ID!) {
        finishService(_id: $_id) {
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

export const RATE_SERVICE = gql`
    mutation RateService($_id: ID!) {
        rateService(_id: $_id) {
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

export const UPDATE_LOGOUT_TIME_DRIVER = gql`
    mutation UpdateLogoutTimeDriver($_id: String!) {
        updateLogoutTimeDriver(_id: $_id) {
            _id
            name
        }
    }
`;

export const UPDATE_LOGOUT_TIME_USER = gql`
    mutation UpdateLogoutTimeUser($_id: String!) {
        updateLogoutTimeUser(_id: $_id) {
            _id
            name
        }
    }
`;

export const CREATE_RATING = gql`
    mutation CreateRating($input: ratingInput!) {
        createRating(input: $input) {
            value
            commentary
            idDriver
            idVehicle
            idService
        }
    }
`;

export const CREATE_COMPLAIN_USER = gql`
    mutation CreateComplainUser($_id: String, $complain: String) {
        createComplainUser(_id: $_id, complain: $complain) {
            _id
        }
    }
`;

export const CREATE_COMPLAIN_DRIVER = gql`
    mutation CreateComplainDriver($_id: String, $complain: String) {
        createComplainDriver(_id: $_id, complain: $complain) {
            _id
        }
    }
`;
