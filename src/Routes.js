import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import Companies from "./Companies";
import Jobs from "./Jobs";
import Company from "./Company";
import Login from "./Login";
import Profile from "./Profile";


// * interesting way of locking down routes for loggedIn users
//  * make a component and send to it two props, the path and a clild component
// * the component will check for current user using a context, will either redirect to the given path and render the child componenet or will send to the /login
import PrivateRoute from "./PrivateRoute";

function Routes({setToken}) {
  return (
    <div className="pt-5">
      <Switch>

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/login">
          {/* REMEMBER: setToken is the state coming back from useLoaclStorage hook */}
          <Login setToken={setToken} />
        </Route>

        <PrivateRoute
          exact
          path="/companies"
        >
          <Companies />
        </PrivateRoute>

        <PrivateRoute
          exact
          path="/jobs"
        >
          <Jobs />
        </PrivateRoute>

        <PrivateRoute
          path="/companies/:handle"
        >
          <Company />
        </PrivateRoute>

        <PrivateRoute
          path="/profile"
        >
          <Profile />
        </PrivateRoute>

      </Switch>
    </div>
  );
}

export default Routes;
