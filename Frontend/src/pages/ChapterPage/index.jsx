import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";
import { useParams } from 'react-router-dom';
import ChapterPageItem from '../../components/ChapterPage/ChapterPageItem';

const ChapterPage = () => {
    const {idChapter} = useParams();

    const [topicsInChapter, setTopicsInChapter] = useState([]);
    const [nameOfChapter, setNameOfChapter] = useState();

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
        });
    }

    useEffect(() => {
      getTopicsInChapter();
      
    }, []);

    if (topicsInChapter.length !== 0){
      return(
        <div className={styles.chapter_page}>
          <header>{nameOfChapter}</header>
          {topicsInChapter.map((t, i) => (
            <ChapterPageItem key={i} title={t.name} />
          ))}
        </div>
      )
    }

    else{
      return(
        <div className={styles.chapter_page}>
          <header>{nameOfChapter}</header>
          <div className={styles.empty_topics}></div>
        </div>
      )
    }
    


}

export default ChapterPage