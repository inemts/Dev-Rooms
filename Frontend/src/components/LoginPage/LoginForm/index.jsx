import React, { useContext, useEffect, useRef, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

import styles from "./index.module.scss";
import HeaderLoginPage from '../Header';
import Input from '../../Input';

import checkEmptyValues from "../buttonHandle";
import {saveTokens} from "../../../localStorage";

import { AuthContext } from '../../../context/authContext';
import fetchData from '../../../fetchCheck';


const LoginForm = () => {

  const [loginInput, setLoginInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);

  const navigator = useNavigate();

  const {user, setUser} = useContext(AuthContext);

  const loginButtonHandle = async () => {
    try {
      if (!checkEmptyValues([loginInput, passwordInput])){
        const response = await fetch("http://localhost:3030/login-user", {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            login: loginInput, 
            password: passwordInput
          })
        });

        if (response.ok){
          const responseData = await response.json();

          saveTokens(responseData.accessToken, responseData.refreshToken);
          
          setUser({
            id: responseData.decoded.id,
            login: responseData.decoded.login,
            role: responseData.decoded.role,
            isLogged: true
          });

          navigator("/");
        }
        
      }
    } catch (error) {
      console.log(`Ошибка авторизации: ${error}`); 
    }

  }



  return (
    <div className={styles.loginForm}>
      <HeaderLoginPage title={"Авторизация"} />

      <div className={styles.inputForm}>
        <Input title={"Введите логин"} typeInput={"text"} getInputValue={setLoginInput} isMessage={false} />
        <Input title={"Введите пароль"} typeInput={"password"} getInputValue={setPasswordInput} isMessage={false}/>
      </div>

      <div className={styles.bottom_container}>
        <button onClick={() => loginButtonHandle()}>Войти</button>
      </div>

    </div>
  )
}

export default LoginForm