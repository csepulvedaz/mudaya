import {gql} from "@apollo/client";

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

export const VEHICLE = gql`
    query Vehicle($_id: String!) {
        vehicle(_id: $_id) {
            _id
            brand
            model
            year
            type
            dimensions
            capacity
            department
            city
            commentary
            idDriver
        }
    }
`;

export const VEHICLES_BY_DRIVER = gql`
    query VehiclesByDriver($idDriver: String!) {
        vehiclesByDriver(idDriver: $idDriver) {
            _id
            brand
            model
            year
            type
            dimensions
            capacity
            department
            city
            commentary
            idDriver
        }
    }
`;

export const ALL_VEHICLES = gql`
    query Vehicles($type: String, $department: String, $city: String) {
        vehicles(type: $type, department: $department, city: $city) {
            _id
            brand
            model
            year
            type
            dimensions
            capacity
            department
            city
            commentary
            idDriver
        }
    }
`;

export const SERVICES_BY_DRIVER = gql`
    query ServicesByDriver($idDriver: String!) {
        servicesByDriver(idDriver: $idDriver) {
            _id
            date
            origin
            destination
            commentaryUser
            commentaryDriver
            state
            price
            idUser
            idDriver
            idVehicle
        }
    }
`;

export const SERVICES_BY_USER = gql`
    query ServicesByUser($idUser: String!) {
        servicesByUser(idUser: $idUser) {
            _id
            date
            origin
            destination
            commentaryUser
            commentaryDriver
            state
            price
            idUser
            idDriver
            idVehicle
        }
    }
`;

export const SERVICES_BY_DATE_UPDATED =gql`
    query ServicesByDateUpdated($_id: String!, $client: String){
        servicesByDateUpdated(_id:$_id,client:$client){
            _id
            date
            origin
            destination
            commentaryUser
            commentaryDriver
            state
            price
            idUser
            idDriver
            idVehicle
        }
    }
`;

export const SERVICES_BY_DATE_CREATED =gql`
    query ServicesByDateCreated($_id:String!){
        servicesByDateCreated(_id:$_id){
            _id
            date
            origin
            destination
            commentaryUser
            commentaryDriver
            state
            price
            idUser
            idDriver
            idVehicle
        }
    }
`;

export const RATINGS_BY_DRIVER = gql`
    query RatingsByDriver($idDriver: String!) {
        ratingsByDriver(idDriver: $idDriver) {
            _id
            value
            commentary
            idDriver
            idVehicle
            idService
        }
    }
`;

export const RATINGS_BY_VEHICLE = gql`
    query RatingsByVehicle($idVehicle: String!) {
        ratingsByVehicle(idVehicle: $idVehicle) {
            _id
            value
            commentary
            idDriver
            idVehicle
            idService
        }
    }
`;

export const RATING_BY_SERVICE = gql`
    query RatingByService($idService: String!) {
        ratingByService(idService: $idService) {
            _id
            value
            commentary
            idDriver
            idVehicle
            idService
        }
    }
`;

export const RANK_BY_VEHICLE = gql`
    query RankByVehicle($idVehicle: String!) {
        rankByVehicle(idVehicle: $idVehicle) {
            _id
            value
            totalRatings
            idVehicle
        }
    }
`;