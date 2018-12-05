import { gql } from "apollo-boost";

/* Recipes Queries */
export const GET_ALL_RECIPES = gql`
    query getAllRecipes {
        getAllRecipes {
            _id
            name
            category
            likes
            createdDate
        }
    }
`

/* User Queries */
export const GET_CURRENT_USER = gql`
    query getCurrentUser {
        getCurrentUser{
            username
            email
            joinDate
            favorites {
                _id
                name
                description
              }
        }
    }
`;

/* User Mutation */

export const SIGNIN_USER = gql`
    mutation signinUser($username: String!, $password: String!) {
        signinUser(username: $username, password: $password) {
            token
        }
    }
`

export const SIGNUP_USER = gql`
    mutation signupUser($username: String!, $email: String!, $password: String!) {
        signupUser(username: $username, email: $email, password: $password) {
            token
        }
    }
`