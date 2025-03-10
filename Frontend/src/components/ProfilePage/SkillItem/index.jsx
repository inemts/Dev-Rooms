import React, { useEffect, useState } from 'react'
import styles from "./index.module.scss";

const SkillItem = ({image, title, level, isEdit, changeProfileSkills}) => {

  const [skillLevel, setSkillLevel] = useState(level);
  const [isEntered, setIsEntered] = useState(false);
  
  const onMouseEnter = () => setIsEntered(true);
  const onMouseLeave = () => setIsEntered(false);

  const decrease = () => {
    setSkillLevel(skillLevel-1);
  }

  const increase = () => {
    setSkillLevel(skillLevel+1);
  }

  useEffect(() => {
    changeProfileSkills(title, skillLevel);
  }, [skillLevel]);


  return (
    <div className={styles.skill_item} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <span>{title}</span>
        <div className={styles.image_container}>
            <img src={image} alt="" />
        </div>

        <div className={styles.skill_levels}>

            <button className={isEdit && isEntered ? "" : "hide"} disabled={skillLevel == 0 ? true : false} onClick={() => {
              skillLevel == 0 ? "" : decrease();
            }}>
                  <div className={styles.line}></div>
            </button>

            {Array.from({length: 3}).map((_, i) => (
              <div key={i} className={`${styles.level} ${i < skillLevel ? "purple_level" : ""}`}></div>
            ))}

            <button className={isEdit && isEntered ? "" : "hide"} disabled={skillLevel == 3 ? true : false} onClick={() => {
              skillLevel == 3 ? "" : increase();
            }}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
          </button>
        </div>

    </div>
  )
}

export default SkillItem