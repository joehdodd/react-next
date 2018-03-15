import React, { Component, Fragment } from 'react';

const Context = React.createContext();
const { Provider, Consumer } = Context;

const coinPriceStyles = {
  margin: `35vh auto`,
  padding: `15px`,
  width: `35%`,
  display: `grid`,
  gridTemplateRows: `1fr 1fr`,
  alignItems: `center`,
  justifyItems: `center`,
  background: `#fff`,
  borderRadius: `4px`,
  boxShadow: `0px 2px 10px 0px rgba(0, 0, 0, 0.5)`,
  fontSize: `2em`
};

class StateProvider extends Component {
  state = {
    loading: true,
    data: {}
  };
  componentWillMount() {
    fetch(`https://api.coindesk.com/v1/bpi/currentprice.json`)
      .then(data => data.json())
      .then(data => {
        this.setState({ data: data, loading: false });
      });
  }
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

const CoinPrice = props => {
  return (
    <div style={coinPriceStyles}>
      <span>Current BTC Price</span>
      {props.loading ? (
        <span>Loading BTC price...</span>
      ) : (
        <span>${props.data.bpi.USD.rate}</span>
      )}
    </div>
  );
};

const CoinData = props => {
  return <Consumer>{context => <CoinPrice {...context} />}</Consumer>;
};

const App = props => {
  return (
    <StateProvider>
      <CoinData />
    </StateProvider>
  );
};

export default App;
