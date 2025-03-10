import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";
import TopicsItem from '../../topicsItem';
import EmptyBlock from '../../EmptyBlock';

const PopularContent = () => {

  const [popularTopics, setPopularTopics] = useState([]);

  const getPopularTopics = async () => {
    const response = await fetch("http://localhost:3030/get-popular-topics", {
      method: "GET",
      headers:{
        "Content-Type": "application/json"
      },
    });

    
    if (response.ok) response.json().then(r => setPopularTopics(r));

  }

  useEffect(() => {
    getPopularTopics();
  }, []);


  return (
    <div className={styles.popular_content}>
      {popularTopics.length != 0 ? 
      
        popularTopics.map((t, i) => (
          <TopicsItem key={i} title={t.name} topicId={t.id} nicknameCreator={t.nickname} valueOfMessages={t.count}  />
        ))
       : 

      (
        <EmptyBlock />
      )}

    </div>
  )
}

export default PopularContent