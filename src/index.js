import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import {
  BrowserRouter as Router,
  Route,
  Switch, // Redirect
} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { Quiz, ProductType } from './components/views';

// Main App layout
import { PageLayout } from './components/layouts';

const history = createBrowserHistory;

export const Test = (
  <Router history={history}>
    <PageLayout>
      <Switch>
        <Route path="/home" exact component={Quiz} />
        <Route path="/product-type/:typeId" exact component={ProductType} />

      </Switch>
    </PageLayout>
  </Router>
);

ReactDOM.render(
  Test,
  document.getElementById('root')
);
serviceWorker.unregister();
