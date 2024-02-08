import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import PrivozSector from '../components/PrivozSector';
import gameBox from '../gamebox.json';
//import axios from 'axios'; // Import axios for making HTTP requests

const PrivozPage = () => {
    const { sectors, players } = gameBox;
    const [gameData, setGameData] = useState(gameBox);
    const { currentUser } = { currentUser: 2 };

    const numPlayers = gameData.players.length;
    const numColumns = Math.min(numPlayers, 6); // Ensure a maximum of 6 columns
    const columnClass = `col-md-${Math.floor(12 / numColumns)}`;


    useEffect(() => {
        // Fetch game data here and set it using setGameData
        // Example:
        // fetchData().then(data => setGameData(data));
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <h2>Privoz Bazar</h2>
                <div className="col-md-9">

                    <div className="game-phase">
                        <div className="row">
                            <div className="col phase1">
                                <h3><span>Phase 1:</span> Choose your location for your first trader. The first trader = $0. 2nd = $10, 3d = $20...</h3>
                            </div>
                            <div className="col phase2 d-none">
                                <h3><span>Phase 2:</span> urchasing Special Cards</h3>
                                <p><span>positive cards:</span> provide protection for the seller or additional income</p>
                                <p><span>negative cards:</span> they fine for illegal trade, seize goods, block work in a department or cause other damage</p>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2">
                        {/* Display existing traders */}
                        {gameData && gameData.sectors.map((sector) => (
                            sector.name !== "Illegal" && (
                                <div key={sector.pk} className="col mb-3">
                                    <div className={`sector border p-3 h-100 ${sector.name.toLowerCase()}`}>
                                        <h3 className="sector-title">{sector.name}</h3>
                                        <div className={`d-flex flex-column gap-1 ${columnClass}`}>
                                            <PrivozSector sector={sector} gameData={gameData} setGameData={setGameData} currentUser={currentUser} />
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
                <div className="col-md-3">
                    {gameData && <Menu gameBox={gameBox} gameData={gameData} />}
                </div>
            </div>
        </div>
    );
};

export default PrivozPage;
