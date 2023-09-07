import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <header className="header">
            <nav className="nav">
                <Link to="/" className="nav-item">홈</Link>
                <Link to="/attendance" className="nav-item">출석체크</Link>
                <Link to="/attendance-status" className="nav-item">출석현황</Link>
                <div className="nav-auth">
                    <Link to="/login" className="auth-button">로그인</Link>
                    <Link to="/register" className="auth-button">회원가입</Link>
                </div>
            </nav>
        </header>
    );
};

export default Home;
