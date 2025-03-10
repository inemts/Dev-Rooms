import React from 'react'
import styles from "./index.module.scss"

const HeaderLoginPage = ({title}) => {
  return (
    <div className={styles.header}>{title}</div>
  )
}

export default HeaderLoginPage