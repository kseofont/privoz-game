import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import PrivozSector from '../components/PrivozSector';
import gameBox from '../gamebox.json';
//import addTrader from '../logic/traderLogic'; // Import addTrader function
const PrivozPage = () => {
    const { sectors, players } = gameBox; // Destructure sectors and players from gameBox

    const [gameData, setGameData] = useState(gameBox); // Initialize gameData with sectors and players
    const { currentUser } = { currentUser: 2 };
    // console.log(currentUser); // This will log 2

    // Function to fetch game data when needed
    useEffect(() => {
        // Fetch game data here and set it using setGameData
        // Example:
        // fetchData().then(data => setGameData(data));
    }, []);

    return (
        <div className="container">
            <div className="row">
                <h2>Privoz Bazar</h2>
                <div className="col-9">
                    <h3>Here is the market Privoz</h3>
                    {gameData && sectors.map((sector) => (
                        sector.name !== "Illegal" && (
                            <div key={sector.pk} className="row">
                                <div className="col">
                                    <div className={`sector border p-3 mb-3 ${sector.name.toLowerCase()}`}>
                                        <h3 className="sector-title">{sector.name}</h3>
                                        <div className="row gap-1">
                                            {/* Pass gameData and setGameData to PrivozSector */}
                                            <PrivozSector sector={sector} gameData={gameData} setGameData={setGameData} currentUser={currentUser} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <div className="col-3">
                    {/* Pass gameData to Menu */}
                    {gameData && <Menu gameBox={gameBox} gameData={gameData} />}
                </div>
            </div>
        </div>
    );
};
export default PrivozPage;