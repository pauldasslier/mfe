import { createBrowserHistory } from 'history'; 
import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyDashboardApp = lazy(() => import('./components/DashboardApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));
import Progress from './components/Progress';
import { Header } from './components/Header';

const generateClassName = createGenerateClassName({
  productionPrefix: 'container',
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header setSignedIn={setSignedIn} isSignedIn={isSignedIn} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <LazyAuthApp setSignedIn={setSignedIn} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <LazyDashboardApp />
            </Route>
            <Route path="/" component={LazyMarketingApp} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};