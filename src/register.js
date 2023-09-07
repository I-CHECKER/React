import React, { useState } from 'react';
import './register.css'; // Import the CSS file

const Register = ({ title, subtitle, subtext }) => {
    const [grade, setGrade] = useState('');
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleGradeChange = (event) => {
        setGrade(event.target.value);
    };

    const handleUserIdChange = (event) => {
        setUserId(event.target.value);
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordsMatch(confirmPassword === event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordsMatch(password === event.target.value);
    };

    const handleSubmit = async () => {

        console.log(userId);
        console.log(name);
        console.log(password);
        console.log(grade);

        try {
            const response = await fetch('https://port-0-i-checker-api-6w1j2alm0e2xsq.sel5.cloudtype.app/user/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId:userId, password:password, grade:grade,name:name }),
                mode: 'cors',
            });

            console.log(JSON.stringify({ userId:userId, name:name, password:password, grade:grade }));

            if (response.ok) {
                response.json().then((data) => {
                    console.log(data);
                    localStorage.setItem('name', name);
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('grade', grade);
                    localStorage.setItem('password', password);

                }).catch((error) => {
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
            <br />
            <label>
                Select Grade:
                <select value={grade} onChange={handleGradeChange}>
                    <option value="0">Select Grade</option>
                    <option value="2학년">2학년</option>
                    <option value="3학년">3학년</option>
                    <option value="4학년">4학년</option>
                    <option value="기타">대학원생</option>
                    {/* Add more grade options as needed */}
                </select>
            </label>

            <label>
                이름:
                <input type="text" value={name} onChange={handleNameChange} />
            </label>

            <label>
                ID:<br />
                <input type="text" value={userId} onChange={handleUserIdChange} />
            </label>

            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <label>
                Confirm Password:
                <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </label>

            <br />

            {passwordsMatch ? (
                <button onClick={handleSubmit}>Submit</button>
            ) : (
                <p>패스워드가 일치하지 않습니다.</p>
            )}
        </div>
    );
};

export default Register;