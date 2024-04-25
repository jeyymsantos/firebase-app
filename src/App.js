import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Signup } from './components/Signup';
import { Login } from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/NotFound';
<<<<<<< HEAD
import Login2 from './components/Login2';
import AddProduct from './components/AddProduct';
=======
>>>>>>> parent of 92b9b7d (stable)


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="sign-up" element={<Signup />} />
        <Route path="login" element={<Login />} />
<<<<<<< HEAD
        <Route path="add_product" element={<AddProduct />} />
        <Route path="login_v2" element={<Login2 />} />
=======
>>>>>>> parent of 92b9b7d (stable)
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
