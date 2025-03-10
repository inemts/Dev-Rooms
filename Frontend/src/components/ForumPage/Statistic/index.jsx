import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss"
import EmptyBlock from '../../EmptyBlock';
import {Link} from "react-router-dom"

const Statistic = () => {

  const [popularUsers, setPopularUsers] = useState([]);

  const getPopularUsers = async () => {
    const response = await fetch("http://localhost:3030/get-popular-users", {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      },
    });

    
    if (response.ok) response.json().then(r => setPopularUsers(r));
  }

  function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100; // Оставляем только последние две цифры числа
    if (n >= 5 && n <= 20) {
        return five; // Для чисел 5-20 используем форму множественного числа
    }
    n %= 10; // Оставляем только последнюю цифру числа
    if (n === 1) {
        return one; // Для числа 1 используем форму единственного числа
    }
    if (n >= 2 && n <= 4) {
        return two; // Для чисел 2-4 используем форму множественного числа
    }
    return five; // Для всех остальных чисел используем форму множественного числа
}


  useEffect(() => {
    getPopularUsers();
  }, []);

  return (
    <div className={styles.statistic}>
      <div className={styles.header}>Топ 5 активных</div>
      <div className={styles.statistic_content}>
        {popularUsers.length == 0 ? 
        (
          <EmptyBlock />
        ) :
          popularUsers.map((u, i) => (
            <Link reloadDocument to={`/profile/${u.name_creator}`}>
            <span>{`${i+1}) ${u.name_creator} `}</span>
            <span>{u.count}<br/>{getNoun(u.count, "сообщение", "сообщения", "сообщений")}</span>
            </Link>
          ))
        
        }
      </div>
    </div>
  )
}

export default Statistic