import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Layout } from 'antd';

import Home from './Home'
import Games from './Games'


const App = () => {
  return (
    <Layout className="container-fluid">
      <Layout.Header className='ps-header row'>
        <div className="ps-logo">
          Game Arena
        </div>
      </Layout.Header>
    <Layout.Content >
    <Router>
    <Switch>
      <Route path="/home">
          <Home />
      </Route>  
      <Route path="/games">
          <Games />
      </Route>  
      <Redirect from="/" to="/home"/>
    </Switch>
  </Router>
  </Layout.Content>
  </Layout>

  );
}


export default App;
