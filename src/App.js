import logo from './logo.svg';
import './App.css';
import { Home } from './components/Home';
import { Signup } from './components/auth/Signup';
import { Login } from './components/auth/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import AddProduct from './components/products/AddProduct';
import AddLocation from './components/locations/AddLocation';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add_product" element={<AddProduct />} />
        <Route path="/add_location" element={<AddLocation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
