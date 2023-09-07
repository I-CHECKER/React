import React, { useState } from 'react';
import "./login.css";
function Login() {
    const [userId, setUserId] = useState(''); // 변경된 부분
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log(JSON.stringify({ userId:userId, password:password }));

        try {
            const response = await fetch('https://port-0-i-checker-api-6w1j2alm0e2xsq.sel5.cloudtype.app/user/signIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId:userId, password:password }),
                mode: 'cors',
            });

            console.log(JSON.stringify({ userId:userId, password:password }));

            if (response.ok) {
                response.json().then(data => {

                    localStorage.setItem('userId', userId);
                    localStorage.setItem('password', password);

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
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
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