const addTrader = (gameData, setGameData, sector, currentUser) => {
    // Define a constant for the price of the trader (currently set to 0)
    const traderPrice = 0;

    // Check if the current sector has less than two traders
    const sectorTradersCount = gameData.players.filter(player => player.traders && player.traders.some(trader => trader.sector === sector.pk)).length;

    if (sectorTradersCount >= 2) {
        console.error('Maximum number of traders reached in this sector.');
        return; // Exit the function early if the maximum number of traders is reached
    }

    // Create a new trader object with default values
    const newTrader = {
        pk: gameData.players.length + 1, // Generate a unique identifier for the new trader
        name: 'New Trader', // Default name for the new trader
        coins: traderPrice, // Default coins for the new trader
        sector: sector.pk, // Set the sector for the new trader
        isTrader: true, // Set the new trader as a trader
    };

    console.log('gameData:', gameData);
    console.log('sector:', sector);
    console.log('New Trader:', newTrader); // Log the new trader object

    // Find the player object with the same pk as currentUser
    const currentUserPlayerIndex = gameData.players.findIndex(player => player.pk === currentUser);

    // If the currentUser player is found, add the new trader to their traders array
    if (currentUserPlayerIndex !== -1) {
        const updatedPlayers = [...gameData.players]; // Copy the players array

        // Add the new trader to the traders array of the currentUser player
        updatedPlayers[currentUserPlayerIndex].traders = [
            ...(updatedPlayers[currentUserPlayerIndex].traders || []),
            newTrader,
        ];

        console.log('Updated Players:', updatedPlayers); // Log the updated players array

        // Update gameData with the updated players array
        const updatedGameData = {
            ...gameData,
            players: updatedPlayers,
        };

        console.log('Updated Game Data:', updatedGameData); // Log the updated game data object

        // Update the game data using the provided setGameData function
        setGameData(updatedGameData);

        console.log('Game Data Updated Successfully');
    } else {
        console.error('User not found in game data.'); // Log an error if currentUser is not found
    }
};

export default addTrader;
