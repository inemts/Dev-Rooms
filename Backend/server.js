//Server NodeJS

//Создаем сервер на Express, подключаем CORS и файл .env для конфигурации. Подключаем файл БД
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes/routes");
require("dotenv").config();


//Говорим серверу использовать JSON и CORS, подключаем роутер на начальный путь
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use("/", router);


//Задаем порт для сервера, который берем из файла .env и, если он пуст, то ставим порт 3030
const PORT = process.env.PORT || 3030;


//Прослушивание сервера
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});