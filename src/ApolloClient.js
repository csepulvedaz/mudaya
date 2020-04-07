import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
// import { gql } from "@apollo/client";

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
        uri: "http://localhost:4000/graphql",
    }),
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
