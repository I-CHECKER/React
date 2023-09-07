import React from 'react';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import Attendance from './locationAuth/locationAuth';
import Home from './Home';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home/>}/>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/attendance" element={<Attendance />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
