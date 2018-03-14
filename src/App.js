import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

const Context = React.createContext();
const { Provider, Consumer } = Context;

class StateProvider extends Component {
  state = {
    name: 'Joe',
    age: 30
  };
  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}

const Home = props => {
  return (
    <Fragment>
      <Link
        to={{
          pathname: '/about'
        }}
      >
        About Joe
      </Link>
    </Fragment>
  );
};

const About = props => {
  return (
    <Consumer>
      {context => (
        <Fragment>
          <p>Name: {context.name}</p>
          <p>Age: {context.age}</p>
        </Fragment>
      )}
    </Consumer>
  );
};

const App = props => {
  return (
    <StateProvider>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </Fragment>
    </StateProvider>
  );
};

export default App;
