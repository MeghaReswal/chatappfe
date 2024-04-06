import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../Home/Home'
import Login from "../Login/Login"
import Register from "../Login/Register";
import Add_Products from "../Login/Add_product";
import User from "../User/User"
import Error from "./Error"



const NavRoute = () => {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<Add_Products />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Error />} />
            <Route path="user" element={<User />} />
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default NavRoute