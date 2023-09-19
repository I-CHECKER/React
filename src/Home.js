import React from 'react';
import { Link } from 'react-router-dom';
import {Navigate} from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import './Home.css';

const Home = () => {
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/home" className="nav-item">홈</Link>
                <Link to="/attendance" className="nav-item">출석체크</Link>
                <Link to="/csv" className="nav-item">엑셀 다운로드</Link>
                <div className="nav-auth">
                    <Link to="/login" className="auth-button">로그인</Link>
                    <Link to="/register" className="auth-button">회원가입</Link>
                </div>
            </nav>
        </header>
    );
};

export default Home;
