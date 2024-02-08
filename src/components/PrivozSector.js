// PrivozSector.js
import React, { useState } from 'react';
import addTrader from '../logic/traderLogic';
import { Modal, Button } from 'react-bootstrap';

const PrivozSector = ({ sector, gameData, setGameData, currentUser }) => {
    const [showAddTraderModal, setShowAddTraderModal] = useState(false);

    const handleAddTrader = () => {
        setShowAddTraderModal(true);
    };

    const handleConfirmAddTrader = () => {
        addTrader(gameData, setGameData, sector, currentUser);

        setShowAddTraderModal(false);
    };

    const handleCloseModal = () => {
        setShowAddTraderModal(false);
    };

    // Filter traders belonging to the current sector
    const sectorTraders = gameData.players.filter(player => {
        // Check if the player has traders
        if (player.traders && player.traders.length > 0) {
            // Check if any trader of the player belongs to the current sector
            return player.traders.some(trader => trader.sector === sector.pk);
        }
        return false; // Return false if the player has no traders or no trader in the current sector
    });

    return (
        <div className={`sector border p-3 mb-3 ${sector.name.toLowerCase()}`}>
            <h3 className="sector-title">{sector.name}</h3>
            <div className="row gap-1">
                {/* Display existing traders */}
                {sectorTraders.map(trader => (
                    <div key={trader.pk} className="col border text-center pb-4 yellow">
                        <p>Trader {trader.name}</p>
                        <p>Coins: {trader.coins}</p>
                    </div>
                ))}
            </div>
            {/* Button to add a new trader */}
            <button onClick={handleAddTrader}>Add Trader</button>
            {/* Modal for adding a new trader */}
            <Modal show={showAddTraderModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Trader Addition</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to add a trader to {sector.name} sector?
                    <p>New Trader price is  coins</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirmAddTrader}>
                        Add Trader
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default PrivozSector;
