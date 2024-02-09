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

    console.log('sectorTradersCount:', sectorTradersCount);




    // Check how many users have traders
    const usersWithTraders = gameData.players.filter(player => player.traders && player.traders.length > 0);

    console.log('usersWithTraders:', usersWithTraders);

    // Check if the current sector has less than two traders
    // const sectorTradersCount = usersWithTraders.filter(player => player.traders.some(trader => trader.sector === sector.pk)).length;
    //  console.log('sectorTradersCount:', sectorTradersCount);
    console.log('gameData.players:', gameData.players.length);

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

        console.log('Game Data Updated Successfully');
    } else {
        console.error('User not found in game data.'); // Log an error if currentUser is not found
    }
};

export default addTrader;
