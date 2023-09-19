import React, { useEffect, useState, useRef } from "react";
import { useGeolocated } from "react-geolocated";
import './locationAuth.css';

const LocationAuth = () => {
    const {
        coords: initialCoords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        timestamp,
    } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: Infinity,
        },
        watchPosition: false,
        userDecisionTimeout: null,
        suppressLocationOnMount: false,
        geolocationProvider: navigator.geolocation,
        isOptimisticGeolocationEnabled: true,
        watchLocationPermissionChange: false,
    });

    const [latitude, setLatitude] = useState(initialCoords?.latitude || "N/A");
    const [longitude, setLongitude] = useState(initialCoords?.longitude || "N/A");
    const [accuracy, setAccuracy] = useState(initialCoords?.accuracy || "N/A");
    const [timestampString, setTimestampString] = useState(
        timestamp ? new Date(timestamp).toLocaleString() : "N/A"
    );
    const [isWithinRange, setIsWithinRange] = useState(false);

    const mapRef = useRef(null);

    const minLongitude = 126.7338;
    const maxLongitude = 126.735;
    const minLatitude = 37.3384;
    const maxLatitude = 37.3392;

    const checkIsWithinRange = () => {
        if (
            initialCoords &&
            initialCoords.longitude >= minLongitude &&
            initialCoords.longitude <= maxLongitude &&
            initialCoords.latitude >= minLatitude &&
            initialCoords.latitude <= maxLatitude
        ) {
            return true;
        }
        return false;
    };

    const initMap = () => {
        if (window.kakao && window.kakao.maps) {
            const container = document.getElementById("map");
            const options = {
                center: new window.kakao.maps.LatLng(
                    initialCoords.latitude,
                    initialCoords.longitude
                ),
                level: 2,
            };

            const map = new window.kakao.maps.Map(container, options);
            mapRef.current = map;

            // 마커를 생성하고 표시
            const markerPosition = new window.kakao.maps.LatLng(
                initialCoords.latitude,
                initialCoords.longitude
            );

            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                map: map,
            });

            // 위치 범위 다시 확인
            setIsWithinRange(checkIsWithinRange());
        }
    };

    const handleSyncLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude, accuracy } = position.coords;
                setLatitude(latitude);
                setLongitude(longitude);
                setAccuracy(accuracy);
                setTimestampString(new Date().toLocaleString());

                // 위치 범위 다시 확인
                setIsWithinRange(checkIsWithinRange());

                // 지도 초기화
                initMap();
            },
            (error) => {
                console.error("Error getting location:", error);
            },
            {
                enableHighAccuracy: true,
                maximumAge: 0,
                timeout: Infinity,
            }
        );
    };

    const handleAttendance = () => {
        if (isWithinRange) {
            const token = localStorage.getItem('access_TOKEN');
            const currentDate = new Date();

            // 날짜 형식화 (YYYY-MM-DD)
            const formattedDate = currentDate.toISOString().split('T')[0];

            // 시간 형식화 (HH:MM)
            const hours = String(currentDate.getHours()).padStart(2, '0');
            const minutes = String(currentDate.getMinutes()).padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;

            const attendanceData = {
                date: formattedDate, // 날짜를 "YYYY-MM-DD" 형식으로 설정
                time: formattedTime, // 시간을 "HH:MM" 형식으로 설정
            };

            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(attendanceData),
            };

            fetch('https://port-0-i-checker-api-eu1k2llleqefn5.sel3.cloudtype.app/attendance/add', requestOptions)
                .then((response) => {
                    if (response.ok) {
                        alert("출석 성공");
                    } else {
                        alert("출석 실패");
                    }
                })
                .catch((error) => {
                    console.error("서버 요청 오류:", error);
                    alert("서버 요청 중 오류가 발생했습니다");
                });
        } else {
            alert("연구실이 근처에 없습니다");
        }
    };

    return (
        <div>
            {!isGeolocationAvailable ? (
                <div>귀하의 브라우저는 위치 정보를 지원하지 않습니다</div>
            ) : !isGeolocationEnabled ? (
                <div>위치 정보가 활성화되지 않았습니다</div>
            ) : (
                <div>
                    <table>
                        <tbody>
                        <tr id="ims-check">
                            <td>IMS 출석체크</td>
                        </tr>
                        <tr>
                            <td>
                                <div id="map" style={{ width: "100%", height: "300px" }}></div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                연구실이 근처에 {isWithinRange ? "있습니다." : "없습니다."}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div id="button-container">
                        <button
                            id="sync-location-button"
                            onClick={handleSyncLocation}
                        >
                            위치 동기화
                        </button>
                        <button
                            className={`attendance-button ${isWithinRange ? 'active' : 'inactive'}`}
                            onClick={handleAttendance}
                        >
                            출석
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LocationAuth;
