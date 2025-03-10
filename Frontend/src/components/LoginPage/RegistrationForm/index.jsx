import React, { useState } from 'react'
import styles from "./index.module.scss";

import HeaderLoginPage from '../Header';
import Input from '../../Input';

import checkEmptyValues from "../buttonHandle";
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

  const [loginInput, setLoginInput] = useState(null);
  const [passwordInput, setPasswordInput] = useState(null);
  const [emailInput, setEmailInput] = useState(null);

  const navigator = useNavigate();


  const registerButtonHandle = async () => {
    try{
      
      if (!checkEmptyValues([loginInput, passwordInput, emailInput])){
        const response = await fetch("http://localhost:3030/register-new-user", {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
  
          body: JSON.stringify({
            login: loginInput,
            password: passwordInput,
            email: emailInput
          })
        })
        .then(resp => resp.json())
        .then(r => {

          if (r.message == "Регистрация прошла успешно!"){
            alert(r.message);
            navigator("/auth");
          }
          else{
            alert(r.message);
          }
        });
      }
    }catch(e){
      console.log(`Ошибка запроса: ${e}`);
    }

  }



  return (
    <div className={styles.registrationForm}>
      <HeaderLoginPage title={"Регистрация"} />

      <div className={styles.inputForm}>
        <Input title={"Введите логин"} typeInput={"text"} getInputValue={setLoginInput} isMessage={false}/>
        <Input title={"Введите почту"} typeInput={"email"} getInputValue={setEmailInput} isMessage={false}/>
        <Input title={"Введите пароль"} typeInput={"password"} getInputValue={setPasswordInput} isMessage={false}/>
      </div>

      <div className={styles.bottom_container}>
        <button onClick={() => {registerButtonHandle()}}>Зарегистрироваться</button>
      </div>

    </div>
  )
}

export default RegistrationForm