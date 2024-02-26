const express = require('express');
const cors = require("cors")

const app = express();
const port = 3000;

app.use(cors());

app.get('/:currencyCode/:toCurrencyCode', async (req, res) => {
    const currencyCode = req.params.currencyCode.toUpperCase();
    const toCurrencyCode = req.params.toCurrencyCode.toUpperCase();

    try {
        const apiUrl = `https://api.exchangeit.app/currencies/${currencyCode}/latest`;
        const apiResponse = await fetch(apiUrl);

        if (apiResponse.ok) {
            const result = await apiResponse.json();
            const data = result.data.rates
            const element = data.find((element) => element.code === toCurrencyCode.toLowerCase());
            if (!element) {
                res.status(404).json('Currency not found');
            }
            res.json(element);
        } else {
            throw new Error('API request failed');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
