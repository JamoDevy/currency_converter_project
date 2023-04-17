import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import logo from './logo.svg';
import Layout from './Layout';
import SingleConverter from './SingleConverter'
import CurrencyConverter from './CurrencyConverter';

import './App.css';

const App = () => {
  return ( 
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={CurrencyConverter} />
          <Route path="/currencyconverter" component={SingleConverter} />
          <Route render={() => <h1>404 Not found</h1>} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;
