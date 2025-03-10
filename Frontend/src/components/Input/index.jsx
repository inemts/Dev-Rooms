import React, { useRef } from 'react';
import styles from "./index.module.scss";

const Input = ({title, typeInput, getInputValue, isMessage, getInputRef}) => {
  const inputRef = useRef(null);
  return (
    <div className={styles.inputForm}>
        {
          typeInput == "password" ? (
              <input 
              ref={inputRef}
                type='password' 
                placeholder='' 
                onChange={(e) => {
                  getInputValue(e.target.value);
                  getInputRef(inputRef);
                }} 
                className={isMessage ? styles.message : ""}
                />) : (
              <input 
              ref={inputRef}
                type={typeInput} 
                placeholder='' 
                onChange={(e) => {
                  getInputValue(e.target.value);
                  getInputRef(inputRef);
                }}
                className={isMessage ? styles.message : ""}
              />)
        }
        <label htmlFor="" >{title}</label>
    </div>
  )
}

export default Input