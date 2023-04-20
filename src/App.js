import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import logo from './logo.svg';
import Layout from './Layout';
import SingleConverter from './SingleConverter';
import CurrencyConverter from './CurrencyConverter';

import './App.css';

const NotFound = () => {
  return <h2>404 Not Found</h2>;
}

const App = () => {
  return ( 
    <Router>
      <Layout>
        <Switch>
          <Route path="/" exact component={CurrencyConverter} />
          <Route path="/SingleConverter" component={SingleConverter} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}

export default App;
