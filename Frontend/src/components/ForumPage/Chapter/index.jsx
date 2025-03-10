import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import delete_basket from "../../../assets/images/delete_basket.png"
import styles from "./index.module.scss"
import { AuthContext } from '../../../context/authContext'
const Chapter = ({title, chapterId}) => {

  const [isHover, setIsHover] = useState(false);
  const {user} = useContext(AuthContext);

  const deleteChapter = async () => {
    const response = await fetch("http://localhost:3030/delete-chapter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
          chapterId
      })
    });

    if (response.ok) window.location.reload();
  }
  return (
    <div className={styles.chapter} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
      {isHover && user?.role=="Администратор" ? (
        <>
          <Link to={`/chapter/${chapterId}`} > {title} </Link>
          <button onClick={deleteChapter}>
              <img src={delete_basket} alt="" />
          </button>
        </>
      ) : (
        <Link to={`/chapter/${chapterId}`} > {title} </Link>
      )}
    </div>
  )
    
}



export default Chapter