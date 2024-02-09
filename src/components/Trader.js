import React from 'react';

const Trader = ({ sector, user, trader }) => {
    // Check if user exists before accessing its properties
    const userName = user ? user.name : "Unknown User";

    return (
        <div className="col border text-center pb-4 yellow">
            <p>Trader Name: {trader.name}</p>
            <p>User Name: {userName}</p>
            <p>Sector: {sector.name}</p>
            {/* You can display other trader information here */}
        </div>
    );
};

export default Trader;
