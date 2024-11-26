import { Toaster } from 'react-hot-toast';
import SignIn from './pages/login';
import SignUp from './pages/signup';
import RouterComponent from './router';
import MainPage from './pages/main';
import './App.css';
import PageNotFound from './pages/not-found';

function App() {
  const token = localStorage.getItem("token");
  const pages = [{ Page: <SignUp />, path: "/signup" }, {Page: token ? <MainPage/> : <PageNotFound/>, path: "/home"}];
  
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <Toaster position="top-center" reverseOrder={false}/>
      <RouterComponent MainPage={<SignIn />} pages={pages} />
    </div>
  );
}

export default App;
