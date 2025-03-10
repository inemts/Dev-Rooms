import styles from "./index.module.scss";
import { AuthContext } from "../../context/authContext";
import { useContext, useRef, useState } from "react";

import search_img from "../../assets/images/TopicsPage/search.png";

function TopicsHeader({title, setIsCreateWindow, searchInputHandle}){

    const {user} = useContext(AuthContext);
    const [isInputOpened, setIsInputOpened] = useState(false);
    const inputRef = useRef(null);

    const searchButtonsHandle = () => {
        setIsInputOpened(!isInputOpened);
    }

    return(
        <header className={styles.topicsHeader}>
                <h3>{title}</h3>  

                <div className={styles.buttons}>
                    <button onClick={() => setIsCreateWindow(true)}>
                        <div className={styles.line}></div>
                        <div className={styles.line}></div>
                    </button>

                    <button onClick={searchButtonsHandle}>
                        <img src={search_img} alt="" />
                    </button>

                    <input  
                    onChange={() => searchInputHandle(inputRef.current.value)} 
                    ref={inputRef} 
                    type="text" 
                    className={isInputOpened ? styles.opened : styles.closed}
                    onBlur={() => {
                        setIsInputOpened(false);
                    }} />

                </div>
                
                 
        </header>
    ) 
} 

export default TopicsHeader;