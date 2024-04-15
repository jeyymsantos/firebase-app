import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
