import { gql } from "apollo-boost";

/* Recipe mutations */
export const ADD_RECIPE = gql`
  mutation addRecipe(
    $name: String!
    $description: String!
    $category: String!
    $instructions: String!
    $username: String
  ) {
    addRecipe(
      name: $name
      description: $description
      category: $category
      instructions: $instructions
      username: $username
    ) {
      _id
      name
      category
      description
      instructions
      likes
      createdDate
    }
  }
`;

/* Recipes Queries */
export const GET_RECIPE = gql`
  query getRecipe($_id: ID!) {
    getRecipe(_id: $_id) {
      _id
      name
      category
      description
      instructions
      likes
      createdDate
      username
    }
  }
`;

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
`;

/* User Queries */
export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    getCurrentUser {
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
`;

export const SIGNUP_USER = gql`
  mutation signupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`;


export const SEARCH_RECIPES = gql`
  query searchRecipes($searchTerm: String) {
    searchRecipes(searchTerm: $searchTerm) {
      _id
      name
      category
      description
      instructions
      likes
      createdDate
      username
    }
  }
`;