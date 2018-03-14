import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

const Context = React.createContext();

class Provider extends Component {
  state = {
    name: 'Joe',
    age: 30
  };
  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
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
    <Context.Consumer>
      {context => (
        <Fragment>
          <p>Name: {context.name}</p>
          <p>Age: {context.age}</p>
        </Fragment>
      )}
    </Context.Consumer>
  );
};

class App extends Component {
  render() {
    return (
      <Provider>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Fragment>
      </Provider>
    );
  }
}

export default App;
