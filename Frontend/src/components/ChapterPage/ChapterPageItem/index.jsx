import React from 'react'
import styles from "./index.module.scss";
import { Link } from 'react-router-dom';

const ChapterPageItem = ({title}) => {
  return (
    <Link className={styles.chapter_item}>{title}</Link>
  )
}

export default ChapterPageItem