const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;

app.listen(port, () => {
    console.log(`listening on port http://127.0.0.1:${port}`);
  })
  

app.post('/', async (req, res) => {
    const sourceCurrency = req.body.queryResult.parameters['unit-currency'].currency;
    const targetCurrency = req.body.queryResult.parameters['currency-name'];
    const amount = req.body.queryResult.parameters['unit-currency'].amount;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b35f0dd809mshc2b823a05bbd521p13135bjsn1b30afe49d79',
        'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(`https://alpha-vantage.p.rapidapi.com/query?to_currency=${targetCurrency}&function=CURRENCY_EXCHANGE_RATE&from_currency=${sourceCurrency}`, options);
      
      const data = await response.json();
      const exchangeRate = data['Realtime Currency Exchange Rate']['5. Exchange Rate'];
      let finalAmount = (exchangeRate * amount);
      finalAmount = Math.round(finalAmount * 100) / 100;

      console.log(finalAmount);
      res.json({"fulfillmentText" : `${amount} ${sourceCurrency} = ${finalAmount} ${targetCurrency}`});

    } catch (error) {
      console.log(error)
    }
 });


