import styles from "./App.module.scss";
import Header from "./components/header";
import Footer from "./components/footer";
import { Routes, Route } from "react-router-dom";
import ForumPage from "./pages/ForumPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import TopicsPage from "./pages/TopicsPage";
import TopicAnswersPage from "./pages/TopicAnswersPage";


function App() {

  const {user, setUser} = useContext(AuthContext);

  useEffect(() => {
    console.log(user);
  }, []);

  
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.container}>
        <Routes>
          <Route path="/" element={<ForumPage />} />
          <Route path="/auth" element={<LoginPage isLoginForm={true} />} />
          <Route path="/profile/:nicknameProfile" element={<ProfilePage />}></Route>
          <Route path="/register" element={<LoginPage isLoginForm={false} />} />
          <Route path="/topics" element={<TopicsPage />}></Route>
          <Route path="/chapter/:idChapter" element={<TopicsPage />}></Route>
          <Route path="/topic/:idTopic" element={<TopicAnswersPage />}></Route>

        
        </Routes>

      </div>
      <Footer />
    </div>
  )

  
}

export default App
