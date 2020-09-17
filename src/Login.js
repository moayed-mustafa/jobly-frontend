import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import "./Login.scss";
import Alert from "./Alert";
import JoblyApi from "./JoblyApi";

function Login({ setToken }) {
  // * history for redirection
  const history = useHistory();
  // * states: --> the first is to toggle between login and signup, I think the second is forms data
  const [activeView, setActiveView] = useState("login");
  const [loginInfo, setLoginInfo] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    errors: []
  });


  //  * those two function are click handlers to change the active form, either login or signup
  function setLoginView() {
    setActiveView("login");
  }

  function setSignupView() {
    setActiveView("signup");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let data;
    let endpoint;

    if (activeView === "signup") {
      // these fields aren't req'd---pass undefined, not empty string
      data = {
        username: loginInfo.username,
        password: loginInfo.password,
        first_name: loginInfo.first_name || undefined,
        last_name: loginInfo.last_name || undefined,
        email: loginInfo.email || undefined
      };
      endpoint = "register";
    } else {
      data = {
        username: loginInfo.username,
        password: loginInfo.password
      };
      endpoint = "login";
    }

    let token;

    try {
      //  * this is crazy syntax!
      token = await JoblyApi[endpoint](data);
    } catch (errors) {
      // * in case of an error from the api, fill the errors array inside loginInfoState with them
      return setLoginInfo(l => ({ ...l, errors }));
    }
    // * use the props setToken, which is the state coming back from the localStorage hook that is passed as props from routes
    //  * to change the state with teh token coming back from the api, this will cause a re-render and this time we will have a proper token on localStorage
    setToken(token);
    //  * redirect to jobs after that
    history.push("/jobs");
  }

  // * standerd form two-way binding
  function handleChange(e) {
    const { name, value } = e.target;
    setLoginInfo(l => ({ ...l, [name]: value }));
  }
  // * this is a little bit strange but it's just a conditinal, loginActive wil be a boolean based on whether or not activeView === "login"
  let loginActive = activeView === "login";

    // * this is very smart: making the three input values and their labels seperate on a variable
  // * that will be rended conditionally based on the value of loginActive(True || Flase)!
  const signupFields = (
    <div>
      <div className="form-group">
        <label>First name</label>
        <input
          name="first_name"
          className="form-control"
          value={loginInfo.first_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Last name</label>
        <input
          name="last_name"
          className="form-control"
          value={loginInfo.last_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={loginInfo.email}
          onChange={handleChange}
        />
      </div>
    </div>
  );

  return (
    <div className="Login">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <div className="d-flex justify-content-end">
    {/* Buttons that will show the forms, based on the active view */}
          <div className="btn-group">
            <button
              className={`btn btn-primary ${loginActive ? "active" : ""} `}
              onClick={setLoginView}
            >
              Login
            </button>
            <button
              className={`btn btn-primary ${loginActive ? "" : "active"} `}
              onClick={setSignupView}
            >
              Sign up
            </button>
          </div>

        </div>

        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label>Username</label>
                <input
                  name="username"
                  className="form-control"
                  value={loginInfo.username}
                  onChange={handleChange}
                />

              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={loginInfo.password}
                  onChange={handleChange}
                />
              </div>

            {loginActive ? "" : signupFields}
                          {/* in Case of errors, use the Alert component, it will flash errors to the user */}
              {loginInfo.errors.length ? (
                <Alert type="danger" messages={loginInfo.errors} />
              ) : null}

              <button
                type="submit"
                className="btn btn-primary float-right"
                onSubmit={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
