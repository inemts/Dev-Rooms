const express = require("express");
const router = express();
const db = require("../Database/db");
const JwtMethods = require("../JWT/jwt");
const jwt = require("jsonwebtoken");
const {loginMiddleware, registerMiddleware, refreshTokens} = require("../Middleware/auth.middleware");
require("dotenv").config();
const env = process.env;

router.use(express.json());

router.post("/register-new-user", registerMiddleware, async (req, res, error) => {
    const register_res = req.register_res;

    if (register_res == "Пользователь с таким логином уже существует.") return res.status(501).json({message: register_res});
    else if (register_res == "Регистрация прошла успешно!") return res.status(201).json({message: register_res});

});

router.post("/login-user", loginMiddleware, async (req, res) => {
    const login_res = req.login_res;


    console.log("login res: " + login_res)
    if (login_res == "Неверный пароль") return res.status(401).json({message: login_res});
    else if (login_res == "Пользователя с таким логином не существует.") return res.status(401).json({message: login_res});

    const accessToken = JwtMethods.generateAccessToken(login_res);
    const refreshToken = JwtMethods.generateRefreshToken(login_res);

    const decoded_access = jwt.verify(accessToken, env.JWT_ACCESS_SECRET);

    await db.saveRefreshToken(refreshToken, login_res);

    return res.status(201).json({
        message: "Успешный вход!",
        accessToken: accessToken,
        refreshToken: refreshToken,
        decoded: decoded_access
    });
});


router.post("/check-tokens", (req, res) => {

    try {
        const accessToken = req.headers.authorization.split(" ")[1];
        const refreshToken = req.headers["refresh-token"];
        
        jwt.verify(accessToken, env.JWT_ACCESS_SECRET, (err, decoded_access) => {
            if (err){
                console.log("Access токен не валидный");

                jwt.verify(refreshToken, env.JWT_REFRESH_SECRET, async (err, decoded_refresh) => {
                    if (err){
                        console.log("Refresh Token не валидный");

                        return res.status(401).json({
                            accessToken: null,
                            refreshToken: null,
                            decoded: null
                        });
                    }


                    const dbRefreshToken = await db.getRefreshToken(decoded_refresh.id);

                    if (refreshToken !== dbRefreshToken) return res.status(401).json({
                        accessToken: null,
                        refreshToken: null,
                        decoded: null
                    });

                    const newAccessToken = JwtMethods.generateAccessToken({
                        id: decoded_refresh.id,
                        login: decoded_refresh.login,
                        role: decoded_refresh.role,
                    });

                    return res.status(200).json({
                        accessToken: newAccessToken,
                        refreshToken: refreshToken,
                        decoded: decoded_refresh
                    });
                });
            }

            else{
                return res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                    decoded: decoded_access
                });
            }
        });
        


    } catch (error) {
        console.log(`Ошибка проверки токенов в route: ${error}`);
        return res.status(401).json();
    }
});


router.get("/get-categories", async (req, res) => {
    try{
        const categories = await db.getCategories();

        if (categories.length == 0) return res.status(200).json([]);

        return res.status(200).json({categories});
    }
    catch(e){
        console.log(`Ошибка получения категорий в роуте: ${e}`);
        return res.status(501).json();
    }
});

router.post("/get-chapters", async (req, res) => {
    try {
        const nameOfCategory = req.body.category_name;
        const chapters = await db.getChapters(nameOfCategory);

        if (chapters.length != 0) return res.status(200).json(chapters);
        else return res.status(500).json();
    } catch (error) {
        console.log(`Ошибка получения разделов в роуте: ${error}`);
    }
});

router.post("/get-topics-in-chapter", async (req, res) => {
    try {
        const idChapter = req.body.chapterId;
    
        const topics = await db.getTopicsInChapter(idChapter);
        const nameOfChapter = await db.getNameOfChapter(idChapter);

        
        const resp = {topics, nameOfChapter};

        if (topics.length != 0 || nameOfChapter) return res.status(200).json(resp);
        else return res.status(501).json();
    } catch (error) {
        console.log(`Ошибка получения тем в разделе в роуте: ${error}`);
    }
});

router.post("/get-topic-answers", async (req, res) => {
    try {
        const idTopic = req.body.idTopic;

        const titleTopic = await db.getTitleTopic(idTopic);
        const nameOfCreator = await db.getNameOfCreator(idTopic);
        const answers = await db.getTopicAnswers(idTopic);

        return res.status(200).json({
            titleTopic,
            nameOfCreator,
            answers
        });
    } catch (error) {
        console.log(`Ошибка получения ответов в роуте: ${error}`);

        return res.status(501).json();
        
    }
});

router.post("/add-new-answer", async (req, res) => {
    try {
        const idCreator = req.body.idCreator;
        const answerText = req.body.message;
        const idTopic = req.body.idTopic;
        await db.addNewAnswer(idCreator, answerText, idTopic);

        return res.status(200).json();

    } catch (error) {
        console.log(`Ошибка добавления ответа в роуте: ${error}`);
        return res.status(500).json();
        
    }
});

router.post("/get-user-topics", async (req, res) => {
    try {
        const login = req.body.login;

        const topics = await db.getUserTopics(login);

        if (topics?.length != 0) return res.status(200).json(topics);
        else return res.status(500).json();
    } catch (error) {
        console.log(`Ошибка получения тем пользователя в роуте: ${error}`);
        return res.status(501).json();
        
    }
});

router.post("/add-new-category", async (req, res) => {
    try {
        const categoryName = req.body.categoryName;

        await db.addNewCategory(categoryName);

        return res.status(200).json();
    } catch (error) {
        console.log(`Ошибка добавления категории в роуте: ${error}`);
        return res.status(500).json();
        
    }
});

router.post("/add-new-chapter", async (req, res) => {
    try {
        const chapterName = req.body.chapterName;
        const categoryName = req.body.categoryName;

        await db.addNewChapter(categoryName, chapterName);
       return res.status(200).json();
    } catch (error) {
        console.log(`Ошибка добавления раздела в роуте: ${error}`);
        return res.status(500).json();
        
    }
});

router.post("/add-new-topic", async (req, res) => {
    try {
        const idChapter = req.body.idChapter;
        const topicName = req.body.topicName;
        const idUser = req.body.idUser;

        await db.addNewTopic(idChapter, topicName, idUser);

        return res.status(200).json();
    } catch (error) {
        console.log(`Ошибка добавления темы в роуте: ${error}`);
        return res.status(500).json();
        
    }
});

router.post("/get-profile-statistic", async (req, res) => {
    try {
        const nickname = req.body.nicknameProfile;
        const profileStatistic = await db.getProfileStatistic(nickname);
        console.log(profileStatistic);
        if (profileStatistic) return res.status(200).json(profileStatistic);
        else return res.status(500).json();
    } catch (error) {
        console.log(`Ошибка получения данных профиля в роуте: ${error}`);
        return res.status(500).json();
        
    }
});

router.post("/update-profile-statistic", async (req, res) => {
    try {
        const idUser = req.body.id;
        const newSkills = req.body.newSkills;

        await db.updateProfileSkills(idUser, newSkills);
       return res.status(200).json();
    } catch (error) {
        console.log(`Ошибка обновления умений в роуте: ${error}`);
        return res.status(500).json();
    }
});

router.get("/get-popular-topics", async (req, res) => {
    try {
        const popularTopics = await db.getPopularTopics();

        return res.status(200).json(popularTopics);
    } catch (error) {
        console.log(`Ошибка получения популярных тем в роуте: ${error}`);
        return res.status(500).json();
        
    }
});

router.get("/get-popular-users", async(req, res) => {
    try {
        const popularUsers = await db.getPopularUsers();

        return res.status(200).json(popularUsers);
    } catch (error) {
        console.log(`Ошибка получения активных пользователей в роуте: ${error}`);
        return res.status(500).json();
        
    }
});

router.post("/delete-topic", async(req, res) => {
    try {
        const topicId = req.body.topicId;

        await db.deleteTopic(topicId);
        return res.status(200).json();
    } catch (error) {
        console.log(`Ошибка удаления темы в роуте: ${error}`);
        return res.status(500).json();
    }
});

router.post("/delete-chapter", async(req, res) => {
    try {
        const chapterId = req.body.chapterId;

        await db.deleteChapter(chapterId);
        return res.status(200).json();
    } catch (error) {
        console.log(`Ошибка удаления раздела в роуте: ${error}`);
        return res.status(500).json();
    }
});

router.post("/delete-category", async(req, res) => {
    try {
        const categoryName = req.body.categoryName;


        await db.deleteCategory(categoryName);
        return res.status(200).json();
    } catch (error) {
        console.log(`Ошибка удаления категории в роуте: ${error}`);
        return res.status(500).json();
    }
});


module.exports = router;