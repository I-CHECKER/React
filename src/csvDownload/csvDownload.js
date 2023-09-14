import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [data, setData] = useState([
        { date: '2023-08-08', id: 3, name: '가', time: '19:00' },
        { date: '2023-08-09', id: 3, name: '가', time: '19:00' },
        { date: '2023-08-10', id: 3, name: '가', time: '19:00' }
    ]);
    const transformDataToMatrix = () => {
        const matrix = [['이름', '1일', '2일', '3일','4일','5일','6일','7일','8일','9일','10일','11일','12일','13일','14일','15일','16일','17일','18일','19일','20일','21일','22일','23일','24일','25일','26일','27일','28일','29일','30일', '31일']];
        data.forEach((item) => {
            const { date, name, time } = item;
            const dateObj = new Date(date);
            const day = dateObj.getDate(); // 날짜에서 일(day) 추출

            if (!matrix.some((row) => row[0] === name)) {
                // 이름이 행에 없으면 새 행 추가
                const newRow = [name];
                for (let i = 1; i <= 31; i++) {
                    newRow.push(i === day ? time : ''); // 날짜에 해당하는 칸에 시간 삽입
                }
                matrix.push(newRow);
            } else {
                // 이름이 이미 행에 있으면 해당 행 찾아서 시간 삽입
                const rowIndex = matrix.findIndex((row) => row[0] === name);
                matrix[rowIndex][day] = time;
            }
        });

        return matrix;
    };

    const fetchData = async () => {
        console.log(selectedMonth);
        try {
            const response = await fetch(
                `https://port-0-i-checker-api-6w1j2alm0e2xsq.sel5.cloudtype.app/attendance/month/${selectedMonth}`,
                {
                    method: "GET",
                    mode: "cors",
                }
            );

            if (!response.ok) {
                throw new Error("Request failed");
            } else {
                const newData = await response.json();
                setData(newData);
                console.log(newData);

            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    // Excel 파일을 생성하고 다운로드하는 함수
    const downloadExcel = () => {
        const matrix = transformDataToMatrix();
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(matrix);
        XLSX.utils.book_append_sheet(wb, ws, '시간표');
        const filename = '시간표.xlsx';
        XLSX.writeFile(wb, filename);
    };

    return (
        <div className="App">
            <button onClick={downloadExcel}>Excel 다운로드</button>
            <div className="calendar">
                <label>
                    월을 선택하세요:
                    <input
                        type="month"
                        name="selectedMonth"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                    />
                </label>
                <button type="button" onClick={fetchData}>
                    선택
                </button>
            </div>
        </div>

    );
}

export default App;
