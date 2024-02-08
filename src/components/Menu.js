import React from 'react';

const Menu = ({ gameBox, gameData }) => {
    const { players } = gameBox;

    return (
        <div>
            <h3>Players Information</h3>
            {players.map((player) => {
                const userData = gameData && gameData.players.find(dataPlayer => dataPlayer.pk === player.pk);
                return (
                    <div key={player.pk} className="card my-2">
                        <div className="card-body">
                            <h5 className="card-title">Player: {player.name}</h5>
                            <p className="card-text">Coins: ${player.coins}</p>
                            <p className={`card-text ${player.color.toLowerCase()}`}>Color: {player.color}</p>
                            {/* Additional information from gameData */}
                            {userData && (
                                <>
                                    <p className="card-text">Level: {userData.level}</p>
                                    {/* Display trader information */}
                                    {userData.traders && userData.traders.map(trader => (
                                        <div key={trader.pk} className="trader-info">
                                            <p className="card-text">Trader Name: {trader.name}</p>
                                            <p className="card-text">Trader Coins: {trader.coins}</p>
                                            {/* Display sector information for each trader */}
                                            <p className="card-text">Sector: {gameData.sectors.find(sector => sector.pk === trader.sector).name}</p>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Menu;
