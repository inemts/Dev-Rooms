import React, { useContext } from 'react'
import styles from "./index.module.scss";
import TopicsHeader from '../../components/topicsHeader';
import TopicsItem from '../../components/topicsItem';
import CreateWindow from '../../components/CreateWindow';
import { AuthContext } from '../../context/authContext';

import EmptyBlock from '../../components/EmptyBlock';

import { useParams} from 'react-router-dom';
import { useState, useEffect } from 'react';


function TopicsPage(){
    const {idChapter} = useParams();

    const [topicsInChapter, setTopicsInChapter] = useState([]);
    const [filteredTopics, setFilteredTopics] = useState([]);
    const [nameOfChapter, setNameOfChapter] = useState();

    const [isCreateWindow, setIsCreateWindow] = useState(false);
    const [inputValue, setInputValue] = useState("");

    const {user} = useContext(AuthContext);

    const getTopicsInChapter = () => {
      const response = fetch("http://localhost:3030/get-topics-in-chapter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({chapterId: idChapter})
      })
        .then(resp => resp.json())
        .then(r => {
          
          setTopicsInChapter(r.topics);
          setNameOfChapter(r.nameOfChapter.name);
          setFilteredTopics(r.topics);
          console.log(r.topics);
        });
    }

    useEffect(() => {
      getTopicsInChapter();
    }, []);

    const addNewTopic = async (topicName) => {
      const response = await fetch("http://localhost:3030/add-new-topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          idChapter,
          topicName,
          idUser: user?.id
        })
      });

      if (response.ok) getTopicsInChapter();
    }

    const searchInputHandle = (input) => {

      if (input == "") setFilteredTopics(topicsInChapter);
      else setFilteredTopics(topicsInChapter.filter(t => t.name.includes(input)));
    }


    if (topicsInChapter?.length !== 0){
        return(
          <>
            <div className={styles.topicsCard}>
              <TopicsHeader title={nameOfChapter} setIsCreateWindow={setIsCreateWindow} searchInputHandle={searchInputHandle}  /> 
              <div className={styles.topicsContainer}>
                {
                  filteredTopics?.length == 0 ?
                  <EmptyBlock />
                  : 
                  filteredTopics?.map((t, i) => (
                    <TopicsItem key={i} title={t.name} topicId={t.id} nicknameCreator={t.nickname} />
                  ))
                }
   
              </div>
            </div>

            <CreateWindow title={"темы"} display={isCreateWindow} setDisplay={setIsCreateWindow} addNew={addNewTopic}/>
          </>


        )
      }
  
      else{
        return(
          <>
            <div className={styles.topicsCard}>
              <TopicsHeader title={nameOfChapter} setIsCreateWindow={setIsCreateWindow}  /> 
            </div>

            <CreateWindow title={"темы"} display={isCreateWindow} setDisplay={setIsCreateWindow} addNew={addNewTopic}/>
          </>


        )
      }
}

export default TopicsPage;