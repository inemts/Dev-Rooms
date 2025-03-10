import React, { useContext, useEffect, useState } from 'react'
import styles from "./index.module.scss";
import avatar_image from "../../assets/images/ProfilePage/avatar.jpg";

import HeaderLoginPage from '../../components/LoginPage/Header';
import SkillItem from '../../components/ProfilePage/SkillItem';
import UserTopics from '../../components/ProfilePage/UserTopics';
import { AuthContext } from '../../context/authContext';

import c_sharp from "../../assets/images/ProfilePage/skills_logo/c_sharp.png";
import css from "../../assets/images/ProfilePage/skills_logo/css.png";
import react from "../../assets/images/ProfilePage/skills_logo/react.png";
import c_plus from "../../assets/images/ProfilePage/skills_logo/c_plus.png";
import js from "../../assets/images/ProfilePage/skills_logo/js.png";
import python from "../../assets/images/ProfilePage/skills_logo/python.png";
import gear from "../../assets/images/ProfilePage/gear.png";
import accept from "../../assets/images/ProfilePage/accept.png";
import { useParams } from 'react-router-dom';


function ProfilePage() {

    const {user} = useContext(AuthContext);
    const {nicknameProfile} = useParams();
    const [imagesSkills, setImagesSkills] = useState([c_sharp, c_plus, css, react, python, js]);
    const [isEdit, setIsEdit] = useState(false);

    const [profileStatistic, setProfileStatistic] = useState({});
    const [profileSkills, setProfileSkills] = useState({});
    const [bottomProfileStatistic, setbottomProfileStatistic] = useState([]);
    const getProfileStatistic = async () => {
        const response = await fetch("http://localhost:3030/get-profile-statistic", {
             method: "POST",
             headers:{
                "Content-Type":"application/json"
             },
             body: JSON.stringify({
                nicknameProfile
             })
        });

        if (response.ok) response.json().then(r => {
            setProfileStatistic(r.statistic);
            setProfileSkills(r.statistic.skills);
            setbottomProfileStatistic(r.statistic2);

            console.log(r.statistic2);
        });


    }

    const updateProfileSkills = async () => {

        console.log(profileSkills);

        const response = await fetch("http://localhost:3030/update-profile-statistic", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: profileStatistic.id,
                newSkills: profileSkills
            })
        });

        if (response.ok) getProfileStatistic();
    }

    const changeProfileSkills = (nameSkill, level) => {
        let newSkills = profileSkills;
        newSkills[nameSkill] = level;
        setProfileSkills(newSkills);
        
    }

    const buttonAcceptClick = () => {
        if (isEdit) updateProfileSkills();
        setIsEdit(!isEdit);
    }


    useEffect(() => {
        if (nicknameProfile) getProfileStatistic();
    }, []);

    if (profileStatistic.skills ){
        return(
            <div className={styles.profilePage}>
    
                <div className={styles.profile_container}>
                    <div className={styles.header}>
                        <div className={styles.container}>
                            <span>{profileStatistic.nickname}</span>
                            <button className={user?.login == nicknameProfile ? "" : "hide"} onClick={buttonAcceptClick}>
                                <img src={isEdit ? accept : gear} alt="" />
                            </button>
                        </div>
                    </div>
    
                    <div className={styles.content}>
    
                        <div className={styles.left_content}>
                            <div className={styles.image_container}>
                                <img src={avatar_image} alt="" />
                            </div>
                            <span>{profileStatistic.role_name}</span> {/* РОЛЬ ЧЕЛОВЕКА */}
                            
                        </div>
    
                        <div className={styles.right_content}>
    
                            <div className={styles.skills}>
    
                                {Object.keys(profileStatistic.skills).map((key, i) => (
                                    <SkillItem changeProfileSkills={changeProfileSkills} key={i} image={imagesSkills[i]} title={key} level={profileStatistic.skills[key]} isEdit={isEdit}></SkillItem>
                                ))}


                                   
             
                            </div>
                            <div className={styles.profile_statistic}>
                                <div className={styles.statistic_block}>
                                    <span>{bottomProfileStatistic[0]?.answers_count} </span>
                                    <span>Сообщений</span>
                                </div>
    
                                <div className={styles.statistic_block}>
                                    <span>{bottomProfileStatistic[0]?.topics_count}</span>
                                    <span>Тем создано</span>
                                </div>
    
                                <div className={styles.statistic_block}>
                                    <span>0</span>
                                    <span>Реакций</span>
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
    
                <UserTopics></UserTopics>
    
            </div>
        )
    }    
}

export default ProfilePage