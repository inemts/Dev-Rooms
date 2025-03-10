import React, { useContext, useEffect, useState } from 'react'
import styles from "./index.module.scss";

import Category from '../Category';
import Statistic from '../Statistic';
import CreateWindow from '../../CreateWindow';
import { AuthContext } from '../../../context/authContext';

const ForumPageContent = () => {

  const [categories, setCategories] = useState(null);
  const [isCreateWindow, setIsCreateWindow] = useState(false);

  const {user} = useContext(AuthContext);

  const getCategories = () => {
    const response = fetch("http://localhost:3030/get-categories", {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(r => setCategories(r.categories));

  }

  useEffect(() => {
    getCategories();
  }, []);

  const addNewCategory = async (categoryName) => {
    const response = await fetch("http://localhost:3030/add-new-category", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        categoryName
      })
    });

    if (response.ok) getCategories();
    
  }


  const deleteCategoryHandle = () => getCategories();


  if (categories) {
    return (
      <>

          <div className={styles.forum_page_content}>
            <div className={styles.categories}>
      
              <div className={styles.container}>
                {categories.map((cat, i) => (
                    <Category key={i} header={cat.name} deleteCategoryHandle = {deleteCategoryHandle} />
                ))}
              </div>

              <button onClick={() => setIsCreateWindow(true)} className={user?.role == "Администратор" ? "" : "hide" }>Новая категория</button>
            </div>
      
            <Statistic />

            
          </div>

          <CreateWindow title={"категории"} display={isCreateWindow} setDisplay={setIsCreateWindow} addNew={addNewCategory}/>
      </>
    )
  }

  else{
    return (
      <>
        <div className={styles.forum_page_content}>
          <div className={styles.categories}>
            <button onClick={() => setIsCreateWindow(true)} className={user?.role == "Администратор" ? "" : "hide" }>Новая категория</button>
          </div>
    
          <Statistic />
        </div>

        <CreateWindow title={"категории"} display={isCreateWindow} setDisplay={setIsCreateWindow} addNew={addNewCategory}/>
      </>
      
    )
  }


}

export default ForumPageContent