import React, { useState } from 'react';
import "./login.css";
function Login() {
    const [email, setEmail] = useState(''); // 변경된 부분
    const [password, setPassword] = useState('');
    const [rememberDevice, setRememberDevice] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await fetch('https://port-0-spring-eu1k2llldpju8v.sel3.cloudtype.app/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                mode: 'cors'
            });

            if (response.ok) {
                response.json().then(data => {
                    const token = data.accessToken;
                    console.log(token);

                    localStorage.setItem('token', token);
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', password);
                    setIsLoggedIn(true);
                }).catch(error => {
                    console.error('JSON 파싱 오류:', error);
                });
            } else {
                console.error('로그인 실패');
            }

        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    return (
        <div>
            <h2>로그인하세요</h2>
            <input
                type="text"
                placeholder="아이디"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="패스월드"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;