import React, { useContext, useEffect, useState } from 'react'

import styles from "./index.module.scss";
import Chapter from '../Chapter';
import { AuthContext } from '../../../context/authContext';
import EmptyBlock from '../../EmptyBlock';
import delete_category_basket from "../../../assets/images/delete_category_basket.png";

import CreateWindow from '../../CreateWindow';
const Category = ({header, deleteCategoryHandle}) => {

  const [chapters, setChapters] = useState([]);
  const [isCreateWindow, setIsCreateWindow] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const {user} = useContext(AuthContext);

  const getChapters = async () => {
    const response = await fetch("http://localhost:3030/get-chapters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        category_name: header
      })
    })
    .then(resp => resp.json())
    .then(r => setChapters(r));
  }

  useEffect(() => {
    getChapters();
  }, []);


  const addNewChapter = async (chapterName) => {
    const response = await fetch("http://localhost:3030/add-new-chapter", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chapterName: chapterName,
        categoryName: header
      })
    });

    if (response.ok) getChapters();
  }

  const deleteCategory = async () => {
    const response = await fetch("http://localhost:3030/delete-category", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoryName: header
      })
    });

    console.log(response);

    if (response.ok) deleteCategoryHandle();
  }


  return (
    <>
        <div className={styles.category}>
          <div className={styles.category_header} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {user?.role=="Администратор" && isHover ? (
              <div className={styles.header_content}>
                <span>{header}</span>
                <button onClick={deleteCategory}>
                            <img src={delete_category_basket} alt="" />
                  </button>
              </div>
            ) : (
              <span>{header}</span>
            )}
            <button onClick={() => setIsCreateWindow(true)} className={user?.role == "Администратор" ? "" : "hide" }>
              <div className={styles.line}></div>
              <div className={styles.line}></div>
            </button>
          </div>
          <div className={styles.category_content}>

            {

              chapters?.length != 0 ? 
                chapters?.map((c, i) => (
                  <Chapter key={i} title={c.name} chapterId={c.id} />
                )) : 
                <EmptyBlock />
              
            }


          </div>
        </div>

        <CreateWindow title={"раздела"} display={isCreateWindow} setDisplay={setIsCreateWindow} addNew={addNewChapter}/>
      </>
  )


  
}

export default Category