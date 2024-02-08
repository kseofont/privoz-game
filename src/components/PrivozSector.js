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
    const sectorTraders = gameData.players.reduce((acc, player) => {
        if (player.traders && player.traders.length > 0) {
            player.traders.forEach(trader => {
                if (trader.sector === sector.pk) {
                    acc.push({ ...trader, parentColor: player.color });
                }
            });
        }
        return acc;
    }, []);

    return (
        <div className={`sector border p-3 mb-3 ${sector.name.toLowerCase()}`}>
            {/* Display existing traders */}
            {sectorTraders.map(trader => (
                <div key={trader.pk} className={`col border text-center pb-4 ${trader.parentColor.toLowerCase()}`}>
                    <i className={`bi bi-shop-window`}></i>
                    <p>Trader {trader.name}</p>
                </div>
            ))}
            {/* If there are no traders, display the "Add Trader" button within a bordered section */}
            {sectorTraders.length === 0 && (
                <div className="col border text-center pb-4">
                    <button className="btn btn-primary" onClick={handleAddTrader}>Add Trader</button>
                </div>
            )}
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
