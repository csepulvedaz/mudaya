import ApolloClient from "apollo-boost";
// import { gql } from "apollo-boost";

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
});

// client
//     .query({
//         query: gql`
//             {
//                 Users {
//                     _id
//                     name
//                     surname
//                     phone
//                     email
//                     password
//                 }
//             }
//         `,
//     })
//     .then((result) => console.log(result));
