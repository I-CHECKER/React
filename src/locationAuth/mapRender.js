// MapRender.js
import React, { useEffect } from "react";
import './mapRender.css';
const { kakao } = window;

const MapRender = ({ latitude, longitude }) => {
    useEffect(() => {
        const container = document.getElementById("map"); // 지도를 담을 영역의 DOM 레퍼런스
        const locPosition = new kakao.maps.LatLng(latitude, longitude); // 현재 위치의 좌표
        const options = {
            center: locPosition, // 지도의 중심 좌표를 현재 위치로 설정
            level: 3, // 지도의 레벨(확대, 축소 정도)
        };
        const map = new kakao.maps.Map(container, options);

        // 현재 위치를 나타내는 마커를 생성합니다
        var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition,
        });

        var iwRemoveable = true;

    }, [latitude, longitude]);

    return (
        <div
            id="map"
            className="map-container" // 스타일 클래스 추가
        ></div>
    );
};

export default MapRender;
