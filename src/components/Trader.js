import React from 'react';

const Trader = ({ sector, user, trader }) => {
    // Check if user exists before accessing its properties
    const userName = user ? user.name : "Unknown User";
    const userColor = user ? user.color : "red";
    // console.log('trader', trader);
    //   console.log('user', user);
    return (
        <div className={`col border text-center pb-4 ${userColor.toLowerCase()}`}>
            <i className={`bi bi-shop-window ${userColor.toLowerCase()}`}></i>
            <p>User Name: {userName}</p>
            {/* <p>Sector: {sector.name}</p> */}
            {/* You can display other trader information here */}
        </div>
    );
};

export default Trader;
