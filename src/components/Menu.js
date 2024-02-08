import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const Menu = ({ gameBox, gameData }) => {
    const { players } = gameBox;
    const [showRulesModal, setShowRulesModal] = useState(false);

    const handleCloseRulesModal = () => setShowRulesModal(false);
    const handleShowRulesModal = () => setShowRulesModal(true);


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

            {/* Button to show rules modal */}
            <Button variant="primary" onClick={handleShowRulesModal}>
                Rules
            </Button>

            {/* Rules Modal */}
            <Modal show={showRulesModal} onHide={handleCloseRulesModal} dialogClassName="modal-70w">
                <Modal.Header closeButton>
                    <Modal.Title>Game Phases</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h3>Phase 1: Determining Map Position and Purchasing Traders</h3>
                                <p>1. Choose your location for your first trader. The first trader costs $0. Subsequent traders cost $10, then $20, and so on.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3>Phase 2: Purchasing Special Cards</h3>
                                <p>1. Purchase special cards. Event cards in hand can be kept for the next round for 1 coin or played immediately after purchase in the same round before selling.</p>
                                <p>2. Each positive card costs 3 coins, and each negative card costs 5 coins. Negative cards can be played immediately in the zone. (At this moment, you cannot buy a new mayor card).</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3>Phase 3: Receiving Goods Cards</h3>
                                <p>1. Obtain goods cards. Two goods cards are opened for each trader from the corresponding zone once per round.</p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3>Phase 4: Opening Weekly Card</h3>
                                <p></p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3>Phase 5: Opening 1 Negative Card for All with Reconstruction</h3>
                                <p></p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3>Phase 6: Selling</h3>
                                <p></p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3>Phase 7: Playing Event Cards from Hand</h3>
                                <p></p>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col">
                                <h3>Phase 8: Feeding. Payment to Traders.</h3>
                                <p>1. Payment to traders. Each trader receives 1 coin. Additional payments according to special cards.</p>
                            </div>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRulesModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Menu;
