const addTrader = (gameData, setGameData, sector, currentUser, phaseData, setPhaseData) => {


    // Define a constant for the price of the trader (currently set to 0)
    const traderPrice = 0;

    // Check if phaseData is not equal to 1, exit the function
    if (phaseData !== 1) {
        console.error('Cannot add trader in current phase.');

        return;
    }


    // Count how many traders are in the current sector
    const sectorTradersCount = gameData.players.reduce((count, player) => {
        // Check if the player has traders
        if (player.traders && player.traders.length > 0) {
            // Increase the count by the number of traders in the current sector
            count += player.traders.filter(trader => trader.sector === sector.pk).length;
        }
        return count;
    }, 0);

    // console.log('sectorTradersCount:', sectorTradersCount);




    // Check how many users have traders
    //const usersWithTraders = gameData.players.filter(player => player.traders && player.traders.length > 0);

    // console.log('usersWithTraders:', usersWithTraders);

    // Check if the current sector has less than two traders
    // const sectorTradersCount = usersWithTraders.filter(player => player.traders.some(trader => trader.sector === sector.pk)).length;
    //  console.log('sectorTradersCount:', sectorTradersCount);
    //  console.log('gameData.players:', gameData.players.length);

    if (sectorTradersCount >= gameData.players.length) {
        console.error('Maximum number of traders reached in this sector.');
        return; // Exit the function early if the maximum number of traders is reached
    }

    // Generate a unique name for the new trader

    const currentUserData = gameData.players.find(player => player.pk === currentUser);


    if (!currentUserData) {
        console.error('Current user not found in game data.');
        return;
    }

    // Count the number of traders belonging to the current user
    const userTradersCount = currentUserData.traders ? currentUserData.traders.length : 0;
    const newTraderName = `Trader ${userTradersCount + 1}`;

    // Create a new trader object with default values
    const newTrader = {
        pk: userTradersCount + 1, // Generate a unique identifier for the new trader
        playerPk: currentUser,
        name: newTraderName, // Unique name for the new trader
        coins: traderPrice, // Default coins for the new trader
        sector: sector.pk, // Set the sector for the new trader
        isTrader: true, // Set the new trader as a trader
    };

    // console.log('gameData:', gameData);

    // console.log('New Trader:', newTrader); // Log the new trader object

    // Find the player object with the same pk as currentUser
    const currentUserPlayerIndex = gameData.players.findIndex(player => player.pk === currentUser);

    //  console.log('currentUserPlayerIndex:', currentUserPlayerIndex);

    // If the currentUser player is found, add the new trader to their traders array
    if (currentUserPlayerIndex !== -1) {
        const updatedPlayers = [...gameData.players]; // Copy the players array

        // Add the new trader to the traders array of the currentUser player
        updatedPlayers[currentUserPlayerIndex].traders = [
            ...(updatedPlayers[currentUserPlayerIndex].traders || []),
            newTrader,
        ];

        //   console.log('Updated Players:', updatedPlayers); // Log the updated players array

        // Update gameData with the updated players array
        const updatedGameData = {
            ...gameData,
            players: updatedPlayers,
        };

        //   console.log('Updated Game Data:', updatedGameData); // Log the updated game data object

        // Update the game data using the provided setGameData function
        setGameData(updatedGameData);

        // New game phase
        const newPhase = phaseData + 1;
        setPhaseData(newPhase);
        //   console.log(' phaseData', phaseData); // Log the updated game phase

        //   console.log('Game Data Updated Successfully');
    } else {
        console.error('User not found in game data.'); // Log an error if currentUser is not found
    }
};

export default addTrader;

// Make Active Event Cards
export const startEventCards = (gameData, qty) => {
    // Clone the event cards array from gameData to avoid mutating the original data
    const eventCardsArray = [...gameData.event_cards];

    // Check if qty contains event cards
    if (!qty.event_cards || !Array.isArray(qty.event_cards)) {
        console.error('Quantity data is not an array:', qty);
        return eventCardsArray; // Return the original event cards array
    }

    // Loop through the event cards array and update the quantities
    eventCardsArray.forEach((eventCard) => {
        // Find the corresponding event card quantity object in qty
        const qtyObj = qty.event_cards.find((item) => item.pk === eventCard.pk);

        // If a quantity object is found, update the quantity of the event card
        if (qtyObj) {
            eventCard.qty = qtyObj.qty;
        } else {
            // If no quantity object is found, set the quantity to 0
            eventCard.qty = 0;
        }
    });
    //  console.log('eventCardsArray', eventCardsArray);
    // Return the updated event cards array
    return eventCardsArray;
};



//Make new Event Cards in game active array
export const makeEventCardArray = (eventCards, setEventCards) => {
    // Filter event cards with quantity > 0 and location "deck"
    const deckEventCards = eventCards.filter(card => card.qty > 0 && card.location === "deck");

    // Multiply each card with its quantity and add cardId
    const eventCardsInGame = deckEventCards.flatMap((card, index) => {
        // Create an array to hold the multiplied cards
        const cardsArray = [];
        // Iterate over the quantity of the card
        for (let i = 0; i < card.qty; i++) {
            // Create a new card object with the additional cardId
            const cardId = `${card.pk}_${String(i + 1).padStart(2, '0')}`;
            const newCard = { ...card, cardId };
            // Push the new card to the array
            cardsArray.push(newCard);
        }
        return cardsArray;
    });
    console.log('eventCardsInGame', eventCardsInGame);

    // Update the event cards state
    setEventCards(eventCardsInGame);
};


//Take new Event Card
//Take new Event Card
// Take new Event Card
export const takeEventCard = (eventCards, setEventCards, currentUser, gameData, setGameData) => {
    // Ensure eventCards is not undefined before proceeding
    if (!eventCards) {
        return; // or handle the error appropriately
    }
    // Filter event cards with quantity > 0 and location "deck"
    const deckEventCards = eventCards.filter(card => card.qty > 0 && card.location === "deck");

    // If there are cards available in the deck
    if (deckEventCards.length > 0) {
        // Select a random card from the deck
        const randomIndex = Math.floor(Math.random() * deckEventCards.length);
        const selectedCard = deckEventCards[randomIndex];

        // Generate a unique cardId for the selected card
        const cardId = `${selectedCard.pk}_${String(deckEventCards.length + 1).padStart(2, '0')}`;

        // Update the selected card's location to "hand"
        selectedCard.location = "hand";

        // Find the current user's player object in the players array
        const currentUserPlayer = gameData.players.find(player => player.pk === currentUser);

        // If the current user's player object is found
        if (currentUserPlayer) {
            // Add the event card's pk to the event_cards array of the player
            if (!currentUserPlayer.event_cards) {
                currentUserPlayer.event_cards = [];
            }
            currentUserPlayer.event_cards.push(selectedCard.pk);
        }

        // Log the updated gameData
        console.log('Updated gameData:', gameData);

        // Update the gameData state with the modified player data
        setGameData(prevGameData => ({
            ...prevGameData,
            players: prevGameData.players.map(player =>
                player.pk === currentUserPlayer.pk ? currentUserPlayer : player
            ),
        }));

    }
};

// Make Active Product Cards
export const startProductCards = (gameData, startProductData) => {
    let productCardsWithQty = [];

    gameData.product_cards.forEach(card => {
        const quantityObj = startProductData.find(item => item.pk === card.pk);
        const quantity = quantityObj ? quantityObj.qty : 10; // Default quantity value if not found in startProductData

        // Duplicate the product card according to its quantity
        for (let i = 0; i < quantity; i++) {
            const productId = `pk_${String(card.pk).padStart(2, '0')}${String(i + 1).padStart(2, '0')}`;
            productCardsWithQty.push({ ...card, qty: 1, product_id: productId, location: "deck" });
        }
    });

    // Sort the array by product ID
    productCardsWithQty.sort((a, b) => a.product_id.localeCompare(b.product_id));

    return productCardsWithQty;
};

// Make function for sort products for each trader for wholesail market
// if users pk is current user, thats product has tradeActive: true, add for each trader 2 random product in that sector. also add 1 Illigal product with  tradeActive: true
export const searchProductForWholesale = (productCards, players, currentUser, setProductCards) => {
    // Verify if currentUser is a valid player pk
    const currentUserPlayer = players.find(player => player.pk === currentUser);
    if (!currentUserPlayer) {
        // Handle the case where currentUser is not a valid player pk
        console.error(`Player with pk ${currentUser} not found.`);
        return []; // Or handle this error in another way
    }

    // Find the current user's sector
    const currentUserSector = currentUserPlayer.sector;

    // Calculate the number of traders in the current user's sector
    const sectorTradersCount = players.reduce((count, player) => {
        // Check if the player has traders and if their sector exists and has a pk property
        if (player.traders && player.traders.length > 0 && player.sector && player.sector.pk) {
            // Increase the count by the number of traders in the current sector
            count += player.traders.length;
        } else {
            // If player's sector is not available, skip this player
            console.warn(`Player with pk ${player.pk} has no valid sector.`);
        }
        return count;
    }, 0);

    // Filter product cards based on the sector of the current user
    let filteredProductCards = [];
    if (currentUserSector) {
        filteredProductCards = productCards.filter(product => product.sector && product.sector.pk === currentUserSector.pk);
    }

    // Select two random products and mark them as tradeActive: true
    const selectedProducts = [];
    for (let i = 0; i < 2; i++) {
        const randomIndex = Math.floor(Math.random() * filteredProductCards.length);
        selectedProducts.push({ ...filteredProductCards[randomIndex], tradeActive: true });
    }

    // Add illegal products if there are no traders
    if (sectorTradersCount === 0) {
        const illegalProduct1 = { name: 'Illegal Product 1', tradeActive: true };
        const illegalProduct2 = { name: 'Illegal Product 2', tradeActive: true };
        selectedProducts.push(illegalProduct1, illegalProduct2);
    }

    return selectedProducts;
};
