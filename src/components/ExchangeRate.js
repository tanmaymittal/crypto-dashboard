
const ExchangeRate = ({exchangeRate, chosentPrimaryCurrency, chosentSecondaryCurrency}) => {
    return (
      <div className="exchange-rate">
          <h3>Exchange Rate</h3>
          <h1>{exchangeRate}</h1>
          <p>{chosentPrimaryCurrency} to {chosentSecondaryCurrency}</p>
      </div>
    );
  }
  
  export default ExchangeRate;
  