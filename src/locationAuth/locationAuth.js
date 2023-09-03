import React, { useEffect, useState, useRef } from "react";
import { useGeolocated } from "react-geolocated";
import MapRender from "./mapRender";

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

    const minLongitude = 126.734441;
    const maxLongitude = 126.734457;
    const minLatitude = 37.33864;
    const maxLatitude = 37.33878;

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
        if (typeof initialCoords !== "string") {
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

    return !isGeolocationAvailable ? (
        <div>귀하의 브라우저는 위치 정보를 지원하지 않습니다</div>
    ) : !isGeolocationEnabled ? (
        <div>위치 정보가 활성화되지 않았습니다</div>
    ) : (
        <div>
            <table style={{ width: "400px" }}>
                <tbody>
                <tr>
                    <td style={{ width: "50%", textAlign: "left" }}>위도</td>
                    <td style={{ width: "300%" }}>{latitude}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: "left" }}>경도</td>
                    <td>{longitude}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: "left" }}>정확도</td>
                    <td>{accuracy}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: "left" }}>날짜</td>
                    <td>{timestampString}</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ textAlign: "left" }}>
                        <div id="map" style={{ width: "100%", height: "300px" }}></div>
                    </td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ textAlign: "left" }}>
                        연구실이 근처에 {isWithinRange ? "있습니다." : "없습니다."}
                    </td>
                </tr>
                </tbody>
            </table>
            <div>
                <button onClick={handleSyncLocation}>동기화</button>
            </div>
        </div>
    );
};

export default LocationAuth;
