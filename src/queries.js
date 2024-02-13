// Example query file: src/queries.js

import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query {
   games{
    id,
    players {
      id
    },
    eventCards {
      id,
      quantity,
      location
    },
    productCards {
      id,
      quantity
    }
    sectors {
      id
    }
  }
  }
`;
