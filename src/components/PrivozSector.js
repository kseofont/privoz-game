import React, { useState } from 'react';
import addTrader from '../logic/traderLogic';
import { Modal, Button } from 'react-bootstrap';

const PrivozSector = ({ sector, gameData, setGameData, currentUser }) => {
    const [showAddTraderModal, setShowAddTraderModal] = useState(false);
    const [showMaxTradersModal, setShowMaxTradersModal] = useState(false);
    const [maxTraders, setMaxTraders] = useState(gameData.players.length);

    const handleAddTrader = () => {
        // Calculate the number of traders in the sector
        const sectorTradersCount = gameData.players.reduce((count, player) => {
            if (player.traders) {
                return count + player.traders.filter(trader => trader.sector === sector.pk).length;
            }
            return count;
        }, 0);

        // Check if the maximum number of traders has been reached
        if (sectorTradersCount >= maxTraders) {
            setShowMaxTradersModal(true);
        } else {
            setShowAddTraderModal(true);
        }
    };

    const handleConfirmAddTrader = () => {
        addTrader(gameData, setGameData, sector, currentUser);
        setShowAddTraderModal(false);
    };

    const handleCloseModal = () => {
        setShowAddTraderModal(false);
        setShowMaxTradersModal(false);
    };

    return (
        <div className={`sector border p-3 mb-3 ${sector.name.toLowerCase()}`}>
            <h3 className="sector-title">{sector.name}</h3>
            <div className="row gap-1">
                {/* Display existing traders */}
                {gameData.players.map(player => (
                    player.traders &&
                    player.traders.filter(trader => trader.sector === sector.pk).map(trader => (
                        <div key={trader.pk} className="col border text-center pb-4 yellow">
                            <p>Trader {trader.name}</p>
                            <p>Coins: {trader.coins}</p>
                        </div>
                    ))
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
            {/* Modal for informing maximum traders reached */}
            <Modal show={showMaxTradersModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Maximum Traders Reached</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Maximum number of traders ({maxTraders}) reached in this sector. You
                    cannot add another trader.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PrivozSector;
