import { gql } from "graphql-request";

export const LOGIN_USER = gql`
  mutation Login($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      token
      user {
        id
        name
        email
        pictureURL
        profile {
          id
          url
        }
        shippingAddress {
          id
          address
          phone
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: String!) {
    User(id: $id) {
      id
      name
      email
      pictureURL
      profile {
        id
        url
      }
      shippingAddress {
        id
        address
        phone
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($data: mutationUserInput!) {
    createUser(data: $data) {
      id
      name
      email
      profile {
        id
        url
      }
      shippingAddress {
        id
        address
        phone
      }
    }
  }
`;

export const CREATE_AND_UPDATE_SHIPPING = gql`
  mutation createAndUpdateShipping(
    $id: String!
    $data: mutationUserUpdateInput!
  ) {
    updateUser(id: $id, data: $data) {
      id
      name
      email
      profile {
        id
        url
      }
      shippingAddress {
        id
        address
        phone
        country
        zipcode
        city
        state
      }
    }
  }
`;

export const GOOGLE_CREATE_AND_UPDATE_SHIPPING = gql`
  mutation createAndUpdateShipping(
    $id: String!
    $data: mutationGoogleUserUpdateInput!
  ) {
    updateGoogleUser(id: $id, data: $data) {
      id
      name
      email
      profile {
        id
        url
      }
      shippingAddress {
        id
        address
        phone
        country
        zipcode
        city
        state
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder($data: mutationOrderInput!) {
    createOrder(data: $data) {
      id
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrder($id: JSON) {
    Orders(where: { orderBy: { equals: $id } }) {
      docs {
        id
        orderBy {
          id
          name
        }
        status
        trackId
        address
        phone
        cart {
          id
          name
          price
          quantity
          productImage {
            url
          }
        }
        discount
        delivery
        tax
        total
        createdAt
        deliveryDate
      }
    }
  }
`;
