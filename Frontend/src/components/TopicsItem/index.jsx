import { Link, useNavigate } from "react-router-dom";
import styles from "./index.module.scss";
import { useContext, useEffect, useState } from "react";
import delete_basket from "../../assets/images/delete_basket.png";
import { AuthContext } from "../../context/authContext";

function TopicsItem({title, topicId, nicknameCreator, valueOfMessages}){

    const [isHover, setIsHover] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        console.log(valueOfMessages);
    }, []);

    const deleteTopic = async () => {
        const response = await fetch("http://localhost:3030/delete-topic", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topicId
            })
          });

          if (response.ok) window.location.reload();

    }

    return(
        <div className={styles.topicsItem} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
            {!valueOfMessages ? isHover && user?.role=="Администратор" ? (
                <>
                    <Link to={`/topic/${topicId}`}>
                        <span>{title}</span>
                        
                    </Link>
                    <button onClick={deleteTopic}>
                            <img src={delete_basket} alt="" />
                    </button>
                </>
                    
                    
                ) : (
                    <Link to={`/topic/${topicId}`}>
                    <span>{title}</span>
                    <span>Автор {nicknameCreator}</span>
                    </Link>
                ) 

                
             : (
                <Link to={`/topic/${topicId}`}>
                    <div className={styles.container}>
                         <span>{title}</span>
                         <span>Ответов - {valueOfMessages}</span>
                    </div>
                        <span>Автор {nicknameCreator}</span>
                    </Link>
            )}

            
        </div>
    )
}

export default TopicsItem;