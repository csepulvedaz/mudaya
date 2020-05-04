import { gql } from "@apollo/client";

export const SERVICE_ADDED = gql`
    subscription ServiceAdded($_id: String!) {
        serviceAdded(_id: $_id) {
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
