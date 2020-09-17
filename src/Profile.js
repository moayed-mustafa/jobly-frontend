import React, { useState, useContext, useEffect, useRef } from "react";
import Alert from "./Alert";
import JoblyApi from "./JoblyApi";
import UserContext from "./UserContext";

const MESSAGE_SHOW_PERIOD_IN_MSEC = 3000;

function Profile() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const [userForm, setUserForm] = useState({
    first_name: currentUser.first_name || "",
    last_name: currentUser.last_name || "",
    email: currentUser.email || "",
    photo_url: currentUser.photo_url || "",
    username: currentUser.username,
    password: "",
    errors: [],
    saveConfirmed: false
  });

    const messageShownRef = useRef(false);
    //  * have no idea what this function is supposed to do and why is it on a hook
  useEffect(
    function() {
      if (userForm.saveConfirmed && !messageShownRef.current) {
        messageShownRef.current = true;
        setTimeout(function() {
          setUserForm(f => ({ ...f, saveConfirmed: false }));
          messageShownRef.current = false;
        }, MESSAGE_SHOW_PERIOD_IN_MSEC);
      }
    },
    [userForm]
  );

  async function handleSubmit(evt) {
    evt.preventDefault();

      try {
        //  * this is cool, sending another object rather tahn the form object state, making the neccesary changing before hand
      let profileData = {
        first_name: userForm.first_name || undefined,
        last_name: userForm.last_name || undefined,
        email: userForm.email || undefined,
        photo_url: userForm.photo_url || undefined,
        password: userForm.password
      };

      let username = userForm.username;
      let updatedUser = await JoblyApi.saveProfile(username, profileData);
      console.log("UPDATED USER", updatedUser)
      setUserForm(f => ({
        ...f,
        errors: [],
        saveConfirmed: true,
        password: ""
      }));
      setCurrentUser(updatedUser);
    } catch (errors) {
      setUserForm(f => ({ ...f, errors }));
    }
  }

    //  * standerd two way binding
  function handleChange(e) {
    const { name, value } = e.target;
    setUserForm(f => ({
      ...f,
      [name]: value,
      errors: []
    }));
  }

  return (
    <div className="col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Profile</h3>
      <div className="card">
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Username</label>
              <p className="form-control-plaintext">{userForm.username}</p>
            </div>
            <div className="form-group">
              <label>First Name</label>
              <input
                name="first_name"
                className="form-control"
                value={userForm.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                name="last_name"
                className="form-control"
                value={userForm.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                name="email"
                className="form-control"
                value={userForm.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Photo URL</label>
              <input
                name="photo_url"
                className="form-control"
                value={userForm.photo_url}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm password to make changes:</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={userForm.password}
                onChange={handleChange}
              />
            </div>

            {userForm.errors.length ? (
              <Alert type="danger" messages={userForm.errors} />
            ) : null}

            {userForm.saveConfirmed ? (
              <Alert type="success" messages={["User updated successfully."]} />
            ) : null}

            <button
              className="btn btn-primary btn-block mt-4"
              onClick={handleSubmit}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
