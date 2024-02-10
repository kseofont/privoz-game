export const updateWholesaleProducts = (gameData, productCards) => {
    const updatedProductCards = [];
    const illegalProductPks = new Set(); // Set to keep track of selected illegal product pks
    const productIDsAdded = new Set(); // Set to keep track of product IDs already added

    gameData.players.forEach(player => {
        const userData = gameData.players.find(dataPlayer => dataPlayer.pk === player.pk);
        if (userData && userData.traders) {
            userData.traders.forEach(trader => {
                // Add two random products from the trader's sector
                const sectorProductCards = productCards.filter(card => card.sector && card.sector.pk === trader.sector);
                for (let i = 0; i < 2; i++) {
                    const randomIndex = Math.floor(Math.random() * sectorProductCards.length);
                    const randomCard = sectorProductCards[randomIndex];
                    if (randomCard) {
                        const updatedCard = { ...randomCard, location: 'hand', owner: player.name, owner_pk: player.pk };
                        updatedProductCards.push(updatedCard);
                        productIDsAdded.add(randomCard.product_id);
                    }
                }
                // Add one illegal product for each unique pk
                productCards.forEach(card => {
                    if (!card.is_legal && !illegalProductPks.has(card.pk) && !productIDsAdded.has(card.product_id)) {
                        const updatedIllegalProduct = { ...card, location: 'hand', owner: player.name, owner_pk: player.pk };
                        updatedProductCards.push(updatedIllegalProduct);
                        illegalProductPks.add(card.pk); // Add illegal product pk to set
                        productIDsAdded.add(card.product_id);
                    }
                });
            });
        }
    });
    return updatedProductCards;
};

//console.log('productCards', productCards.filter(card => card.location === 'hand'));