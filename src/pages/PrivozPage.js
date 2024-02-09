import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import PrivozSector from '../components/PrivozSector';
import gameBox from '../gamebox.json';
//import axios from 'axios'; // Import axios for making HTTP requests

const PrivozPage = () => {
    const { sectors, players } = gameBox;
    const [gameData, setGameData] = useState(gameBox); // All gamedata ftom start from the server
    const [phaseData, setPhaseData] = useState(1); // All gamedata ftom start from the server
    const { currentUser } = { currentUser: 2 };




    useEffect(() => {
        // Fetch game data here and set it using setGameData
        // Example:
        // fetchData().then(data => setGameData(data));
    }, []);




    // const [data, setData] = useState(null);

    // const fetchData = () => {
    //     axios.get('https://privoz.lavron.dev/api/box/2/')
    //         .then(response => {
    //             console.log('Server response:', response);
    //             setData(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // };

    // // Fetch data when component mounts
    // fetchData();

    return (
        <div className="container-fluid">
            <div className="row">
                <h2>Privoz Bazar</h2>
                <div className="col-md-9">

                    <div className="game-phase mb-2 border border-green px-3 py-2">
                        <div className="row">
                            <div className={`col phase1 ${phaseData !== 1 ? 'd-none' : ''}`}>
                                <h3><span>Phase 1:</span> Choose your location for your first trader. The first trader = $0. 2nd = $10, 3d = $20...</h3>
                            </div>
                            <div className={`col phase2 ${phaseData !== 2 ? 'd-none' : ''}`}>
                                <h3><span>Phase 2:</span> Purchasing Special Cards</h3>
                                <p><span>Positive cards:</span> provide protection for the seller or additional income</p>
                                <p><span>Negative cards:</span> they fine for illegal trade, seize goods, block work in a department or cause other damage</p>
                            </div>
                            <div className={`col phase3 ${phaseData !== 3 ? 'd-none' : ''}`}>
                                <h3><span>Phase 3:</span> Receiving Goods Cards</h3>
                                <p>1. Obtain goods cards. Two goods cards are opened for each trader from the corresponding zone once per round.</p>
                            </div>
                            <div className={`col phase4 ${phaseData !== 4 ? 'd-none' : ''}`}>
                                <h3><span>Phase 4:</span> Opening Weekly Card</h3>
                                <p></p>
                            </div>
                            <div className={`col phase5 ${phaseData !== 5 ? 'd-none' : ''}`}>
                                <h3><span>Phase 5:</span> Opening 1 Negative Card for All with Reconstruction</h3>
                                <p></p>
                            </div>
                            <div className={`col phase6 ${phaseData !== 6 ? 'd-none' : ''}`}>
                                <h3><span>Phase 6:</span> Selling</h3>
                                <p></p>
                            </div>
                            <div className={`col phase7 ${phaseData !== 7 ? 'd-none' : ''}`}>
                                <h3><span>Phase 7:</span> Playing Event Cards from Hand</h3>
                                <p></p>
                            </div>
                            <div className={`col phase8 ${phaseData !== 8 ? 'd-none' : ''}`}>
                                <h3><span>Phase 8:</span> Feeding. Payment to Traders.</h3>
                                <p>1. Payment to traders. Each trader receives 1 coin. Additional payments according to special cards.</p>
                            </div>
                            {/* Add more phases as needed */}
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-md-2">
                        {/* Display existing traders */}
                        {gameData && gameData.sectors.map((sector) => (
                            sector.name !== "Illegal" && (
                                <div key={sector.pk} className="col mb-3">
                                    <div className={`sector border p-3 h-100 ${sector.name.toLowerCase()}`}>
                                        <h3 className="sector-title">{sector.name}</h3>
                                        {/* <div className={`d-flex flex-column gap-1 ${columnClass}`}> */}
                                        <PrivozSector sector={sector} gameData={gameData} setGameData={setGameData} currentUser={currentUser} phaseData={phaseData} setPhaseData={setPhaseData} />
                                        {/* </div> */}
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
