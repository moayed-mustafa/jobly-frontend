import React, { useState, useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import { decode } from "jsonwebtoken";
// * make a spinner loader and import here
import useLocalStorage from './useLocalStorage'
import Api from './JoblyApi'
import UserContext from './UserContext'
import Navigation from "./Navigation";
import Routes from './Routes'



// todo: task for tomorrow: set all the routes components

export const TOKEN_KEY= "jobly-token";
function App() {
  //  * set states for checking if the data has loaded and one for storing the current user
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)


  const [token, setToken] = useLocalStorage(TOKEN_KEY);
  console.log(token)


  // * make a useEffect hook to get the current user from the backend, update both states
  useEffect(() => {
    async function getCurrentUser() {
      try {
        // * use decode function from jsonwebtoken to get the username based on the token value
        let { username } = decode(token)
        //  * then get the user data based on his username
        let currentUser = await Api.getCurrentUser(username)
        //  * make a state out of that data
        setCurrentUser(currentUser)
      } catch (e) {
        setCurrentUser(null)
      }
    }
    // * I'm assuming this state refers to the user info, rather that what I first thought which was the app data --> companies and jobs
    setInfoLoaded(true)
    getCurrentUser()
  }, [token])
  //  * loggin out functionality:

  function handleLogOut() {
    setInfoLoaded(false)
    setCurrentUser(null)
    // should remove the token from local storage as well
    setToken(null)
  }

  if (!infoLoaded) {
    return <h1>NO Data Loaded.... show a spinner later on</h1>
  }


  // * what is being rendered from here:
  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        <div className="App">
          {/* sending the logout function as a prop to navigation! interesting */}
          <Navigation logout={handleLogOut} />
          {/* sending the setter function for the token as a prop! also interestin */}
          <Routes setToken={setToken} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
