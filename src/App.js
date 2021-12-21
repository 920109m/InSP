import React from "react";

import "./App.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import { ProvideAuth, useAuth } from "./hooks/useAuth";

import MarketList from "./pages/MarketList";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Test from "./pages/Test";
import { LoadingAuth, LoadingProcess } from "./pages/LoadingLayer";
import MakeMarket from "./pages/MakeMarket";
import ProfileEdit from "./pages/ProfileEdit";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <div className="App">
      {/* <ProvideAuth> */}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={MarketList} />
            <PrivateRoute path="/makeMarket/:marketid" component={MakeMarket} />
            <PrivateRoute exact path="/profile" component={ProfileEdit} />
            <Route exact path="/test" component={Test} />
            <Route exact path="/login" component={Login} />
            <Route path="*" component={NotFound} />
          </Switch>
          <LoadingAuth />
          <LoadingProcess />
        </Router>
      </QueryClientProvider>
      {/* </ProvideAuth> */}
    </div>
  );
}

export default App;

function PrivateRoute({ component: Component, ...rest }) {
  const [{ user, authLoading }] = useAuth();
  return (
    !authLoading && (
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          )
        }
      />
    )
  );
}
