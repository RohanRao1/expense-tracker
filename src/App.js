import "./App.css";
import React, { useContext } from "react";
import Login from "./components/authentication/Login";
import WelcomePage from "./components/pages/WelcomePage";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthContext from "./components/auth/AuthContext";
import ProfilePage from "./components/pages/ProfilePage";
import ResetPassword from "./components/pages/ResetPassword";
import { useSelector } from "react-redux";

function App() {
  // const authctx = useContext(AuthContext)

  const isLoggedIn = useSelector(state => state.authentication.isAuthenticated)
  
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        {isLoggedIn && (
          <Route path="/Welcomepage" exact>
            <WelcomePage />
          </Route>
        )}
        {isLoggedIn && (
          <Route path="/Welcomepage/profile">
            <ProfilePage />
          </Route>
        )}
        <Route path='/resetpassword'>
          <ResetPassword />
        </Route>
        <Route path="*">Page Not Found</Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;