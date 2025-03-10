import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";

import Widget from '../../components/ForumPage/Widget';
import ForumPageContent from '../../components/ForumPage/ForumPageContent';

const ForumPage = () => {

  return (
    <div className={`${styles.forumPage}`}>
      <Widget />
      <ForumPageContent />
    </div>
  )
}

export default ForumPage