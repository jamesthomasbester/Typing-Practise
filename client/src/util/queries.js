import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      data {
        character
        fields {
            count
            incorrect
            correct
            latency
        }
      }
    }
  }
`;

// export const QUERY_DATA = gql`
//   query singleProfile($profileId: ID!) {
//     profile(profileId: $profileId) {
//         data {
//             character
//             fields {
//                 count
//                 incorrect
//                 correct
//                 latency
//             }
//         }
//     }
//   `


