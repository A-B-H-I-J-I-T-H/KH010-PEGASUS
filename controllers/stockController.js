// controllers/stockController.js
const axios = require('axios');

async function getTopStocksWithRetry(maxRetries = 3) {
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const apiKey = 'DG7hKVv16v2ultrGKUBlA3q0IawE626W';
            const apiUrl = `https://financialmodelingprep.com/api/v3/stock/actives?apikey=${apiKey}&limit=10`;

            const response = await axios.get(apiUrl);
            const topStocks = response.data.mostActiveStock;

            const formattedStocks = topStocks.map(stock => ({
                symbol: stock.ticker,
                companyName: stock.companyName,
                price: stock.price,
                changes: stock.changes,
                changesPercentage: stock.changesPercentage,
            }));

            return formattedStocks;
        } catch (error) {
            console.error(`Error fetching top stocks (Attempt ${retries + 1}):`, error);
            retries++;
        }
    }

    console.log('Max retries reached. Failed to fetch top stocks.');
    return null;
}

async function getTopStocks(req, res) {
    const topStocks = await getTopStocksWithRetry();

    if (topStocks) {
        res.json({ topStocks });
    } else {
        res.status(500).json({ error: 'Failed to fetch top stocks.' });
    }
}

module.exports = {
    getTopStocks,
};
