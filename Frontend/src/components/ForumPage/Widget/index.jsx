import React, { useState } from 'react'
import styles from "./index.module.scss"
import EmptyBlock from '../../EmptyBlock';

import PopularContent from '../../ForumPageWidget/PopularContent';

const Widget = ({isBlur}) => {

    const [isPopular, setIsPopular] = useState(true);
  return (
    <div className={`${styles.widget} ${isBlur ? styles.blur : ""}`}>
        <div className={styles.widget_header}>
            <button 
                className={`${isPopular ? styles.active : ""}`}
                onClick={() => setIsPopular(true)}>
                    Популярное
            </button>

            <button 
                className={`${!isPopular ? styles.active : ""}`}
                onClick={() => setIsPopular(false)}>
                    Новости
            </button>
        </div>

        <div className={styles.widget_content}>
            {isPopular ? <PopularContent /> : <EmptyBlock />}
        </div>

        
    </div>
  )
}

export default Widget