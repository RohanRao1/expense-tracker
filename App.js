import "./App.css";
import React, { useContext } from "react";
import Login from "./components/authentication/Login";
import WelcomePage from "./components/pages/WelcomePage";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./components/auth/AuthContext";

function App() {
  const authctx = useContext(AuthContext)

  const isLoggedIn = authctx.isLoggedIn
  
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
       {isLoggedIn && <Route path="/Welcomepage">
          <WelcomePage />
        </Route> }
        <Route path='*'>
          Page Not Found
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
