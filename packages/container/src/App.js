import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

const LazyMarketingApp = lazy(() => import('./components/MarketingApp'));
const LazyAuthApp = lazy(() => import('./components/AuthApp'));
import Progress from './components/Progress';
import { Header } from './components/Header';

const generateClassName = createGenerateClassName({
  productionPrefix: 'container',
});

export default () => {
  const [isSignedIn, setSignedIn] = useState(false);

  console.log('123');

  return (
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <Header setSignedIn={setSignedIn} isSignedIn={isSignedIn} />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <LazyAuthApp setSignedIn={setSignedIn} />
            </Route>
            <Route path="/" component={LazyMarketingApp} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </BrowserRouter>
  );
};