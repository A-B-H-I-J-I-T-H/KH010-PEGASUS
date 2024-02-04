const axios = require('axios');

// Function to fetch top 10 stocks from Financial Modeling Prep API
async function getTopStocks() {
    try {
        const apiKey = 'DG7hKVv16v2ultrGKUBlA3q0IawE626W';
        const apiUrl = `https://financialmodelingprep.com/api/v3/stock/actives?apikey=${apiKey}&limit=10`;

        const response = await axios.get(apiUrl);
        const topStocks = response.data.mostActiveStock;

        return topStocks.map(stock => ({
            symbol: stock.ticker,
            companyName: stock.companyName,
            price: stock.price,
            changes: stock.changes,
            changesPercentage: stock.changesPercentage,
        }));
    } catch (error) {
        console.error('Error fetching top stocks:', error);
        return null;
    }
}

// Main function to fetch and log top 10 stocks
async function main() {
    const topStocks = await getTopStocks();

    if (topStocks) {
        console.log('Top 10 Stocks:', topStocks);
    } else {
        console.log('Failed to fetch top stocks.');
    }
}

// Execute main function
main();
