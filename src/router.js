import React from 'react';
import { Router, Route, Switch } from 'dva/router';

// import Home from './components/Home';
// import Topic from './components/Topic';

const RouterConfig = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        {/* <Route path="/home" exact component={Home} /> */}
        {/*<Route path="/topic" exact component={Topic} />*/}
      </Switch>
    </Router>
  );
}

export default RouterConfig;
