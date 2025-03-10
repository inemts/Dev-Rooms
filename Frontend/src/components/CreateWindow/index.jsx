import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";

import Input from '../Input';

const CreateWindow = ({title, display, setDisplay, addNew}) => {


  const [inputValue, setInputValue] = useState("");


  const buttonClickHandle = () => {
    addNew(inputValue);
    setDisplay(!display);
  };

  return (
    <div className={`${styles.create_window} ${display ? styles.display : styles.none}`}>
        <div className={styles.header}>Создание {title}</div>

        <div className={styles.content}>
            <Input title={`Введите название ${title}`} getInputValue={setInputValue} />

            <div className={styles.buttons}>
                <button onClick={buttonClickHandle}>Добавить</button>
                <button onClick={() => {
                  setDisplay(!display);
                  }}>Отменить</button>
            </div>
        </div>
    </div>
  )
}

export default CreateWindow