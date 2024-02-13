import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_TRADERS = gql`
  query GetTraders {
    traders {
      id
      products {
        id
        isLegal
        sector {
          id
          name
        }
        players {
          name
          id
        }
      }
      player {
        coins
        color
        name
        id
      }
    }
  }
`;

const QueryPage = () => {
    const { loading, error, data } = useQuery(GET_TRADERS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Traders Data</h1>
            {/* Render the fetched data here */}
            {/* Example: */}
            {data.traders.map(trader => (
                <div key={trader.id}>
                    <h2>{trader.player.name}</h2>
                    <p>Coins: {trader.player.coins}</p>
                    {/* Render other trader details and associated products here */}
                </div>
            ))}
        </div>
    );
};

export default QueryPage;
