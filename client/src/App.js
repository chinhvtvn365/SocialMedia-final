import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from "react-router-dom";
import './App.css';
import Messages from './components/Messages/Messages';
import Auth from './pages/Auth/Auth';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';
import { SkeletonTheme } from 'react-loading-skeleton'
import NotFound from './components/NotFound/NotFound';
import "react-toastify/dist/ReactToastify.css";
import Toast from './components/LoadingError/Toast';

function App() {
  const userInfo = useSelector((state) => state.userLogin.userInfo)
  
  return (
    <div className="App">
         <Toast />
        <SkeletonTheme baseColor="#ebebeb" highlightColor="#f5f5f5">
      <Routes>
        <Route path="/" element={userInfo ? <Navigate to="timeline" /> : <Navigate to="auth" />} />
        <Route path="/timeline" element={userInfo ? <Home /> : <Navigate to="../auth" />} />
        <Route path="/auth" element={userInfo ? <Navigate to="../timeline" /> : <Auth />} />
        <Route path="/profile/:id" element={userInfo ? <Profile /> : <Navigate to="../auth" />} />
        <Route path="/messages" element={userInfo ? <Messages /> : <Navigate to="../auth" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </SkeletonTheme>
    </div>
  );
}

export default App;
