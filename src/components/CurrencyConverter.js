import { useState } from 'react'
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

const CurrencyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA', 'PRE', 'SOL'];
    const [chosentPrimaryCurrency, setChosentPrimaryCurrency] = useState('BTC');
    const [chosentSecondaryCurrency, setChosentSecondaryCurrency] = useState('BTC');
    const [amount, setAmount] = useState(1);
    const [exchangeRate, setExchangeRate] = useState(0);
    const [result, setResult] = useState(0);
    // chosentSecondaryCurrency
    console.log(chosentPrimaryCurrency);
    // console.log(amount);

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {to_currency: chosentSecondaryCurrency, function: 'CURRENCY_EXCHANGE_RATE', 
            from_currency: chosentPrimaryCurrency},
            headers: {
              'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
              'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY
            }
          };
          
        axios.request(options).then((response) => {
            console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
            setResult(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
        }).catch((error) => {
            console.error(error);
        });
    }
    console.log(exchangeRate);
    return (
      <div className="currency-converter">
        <h2>CurrencyConverter</h2>
        <div className="input-box">
            <table>
                <tbody>
                    <tr>
                        <td>Primary Currency:</td>
                        <td>
                            <input 
                                type="number"
                                name="currency-amount-1"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </td>
                        <td>
                            <select
                                value = {chosentPrimaryCurrency}
                                name="currency-option-1"
                                className="currency-options"
                                onChange={(e) => setChosentPrimaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>Secondary Currency:</td>
                        <td>
                            <input 
                                type="number"
                                name="currency-amount-2"
                                value={result}
                                disabled={true}
                            />
                        </td>
                        <td>
                            <select
                                value = {chosentSecondaryCurrency}
                                name="currency-option-2"
                                className="currency-options"
                                onChange={(e) => setChosentSecondaryCurrency(e.target.value)}
                            >
                                {currencies.map((currency, _index) => (<option key={_index}>{currency}</option>))}
                            </select>
                        </td>
                    </tr>
                </tbody>
            </table>
            <button id="convert-button" onClick={convert}>Convert</button>
        </div>
        <ExchangeRate 
            exchangeRate={exchangeRate}
            chosentSecondaryCurrency = {chosentSecondaryCurrency}
            chosentPrimaryCurrency = {chosentPrimaryCurrency}
        />
      </div>
    );
  }
  
  export default CurrencyConverter;
  