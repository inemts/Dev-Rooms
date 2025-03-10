import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../../../context/authContext';
import TopicsItem from '../../topicsItem';

import styles from "./index.module.scss";
import { useParams } from 'react-router-dom';
import EmptyBlock from '../../EmptyBlock';

const UserTopics = () => {


  const [userTopics, setUserTopics] = useState([]);

  const {user} = useContext(AuthContext);
  const {nicknameProfile} = useParams();

  const getUserTopics = async () => {
    const response = await fetch("http://localhost:3030/get-user-topics", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        login: nicknameProfile
      })
    })

    if (response.ok) console.log(response.json().then(r => setUserTopics(r)))
  }


  
  useEffect(() => {
    if (nicknameProfile) getUserTopics();
  }, [user]);

  
  return (
    <div className={styles.user_topics}>
        <div className={styles.header}>
            Публикации
        </div>

        {userTopics.length == 0 ? (
            <div className={styles.topics}>
              <EmptyBlock />
            </div>
        ) : (
            <div className={styles.topics}>
              {userTopics.map((t, i) => (
                <TopicsItem key={i} topicId={t.id} title={t.name} nicknameCreator={t.nickname} />
              )) }
            </div>
        ) }
    </div>
  )
}

export default UserTopics