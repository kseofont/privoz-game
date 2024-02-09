import React, { useState } from 'react';
import addTrader from '../logic/traderLogic';
import { Modal, Button } from 'react-bootstrap';
import Trader from './Trader';

const PrivozSector = ({ sector, gameData, setGameData, currentUser, phaseData, setPhaseData }) => {
    const [showAddTraderModal, setShowAddTraderModal] = useState(false);
    const [showMaxTradersModal, setShowMaxTradersModal] = useState(false);




    const handleConfirmAddTrader = () => {
        addTrader(gameData, setGameData, sector, currentUser, phaseData, setPhaseData);

        setShowAddTraderModal(false);
    };

    const handleCloseModal = () => {
        setShowAddTraderModal(false);
    };


    const sectorTraders = gameData.players.flatMap(player =>
        player.traders ? player.traders.filter(trader => trader.sector === sector.pk) : []
    );

    // Maximum number of traders allowed in the sector
    const maxTraders = gameData.players.length;

    // Count how many traders are currently in the sector
    const currentTradersCount = sectorTraders.length;

    // Function to handle adding a trader
    const handleAddTrader = () => {
        if (currentTradersCount >= maxTraders) {
            setShowMaxTradersModal(true);
        } else {
            setShowAddTraderModal(true);
        }
    };


    return (
        <div className={`sector border p-3 mb-3 ${sector.name.toLowerCase()}`}>

            <div className="row gap-1">
                {/* Display existing traders */}

                {sectorTraders.map((trader, index) => (
                    <Trader key={`${trader.pk}-${index}`} sector={sector} user={gameData.players.find(player => player.pk === trader.playerPk)} trader={trader} />
                ))}




            </div>
            {/* Button to add a new trader */}
            {phaseData <= 1 && <button onClick={handleAddTrader}>Add Trader</button>}
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
            {/* Modal for maximum traders reached */}
            <Modal show={showMaxTradersModal} onHide={() => setShowMaxTradersModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Maximum Traders Reached</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Maximum number of traders ({maxTraders}) reached in this sector. You
                    cannot add another trader.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="primary"
                        onClick={() => setShowMaxTradersModal(false)}
                    >
                        OK
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};


export default PrivozSector;
