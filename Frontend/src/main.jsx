import { StrictMode, useContext, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';
import './index.scss';

import { getTokens, saveTokens } from './localStorage.js';
import checkTokens from './checkTokens.js';

import { AuthProvider } from './context/authContext.jsx';
import { AuthContext } from './context/authContext.jsx';
import fetchData from './fetchCheck.js';

const Main = () => {

  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {

    const getData = async () => {
      const tokens = getTokens();
      const data = await(fetchData(tokens));

      setUser({
        id: data.user.id,
        login: data.user.login,
        role: data.user.role,
        isLogged: data.user.isLogged
      });
      console.log(data);
      
    }
    
    getData();
  }, []);

  useEffect(() => {
    console.log("User in context after update:", user);
  }, [user])
    

  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Main />
  </AuthProvider>
);
