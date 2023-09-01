import React, { useEffect, useState } from "react";
import { useGeolocated } from "react-geolocated";
import { Wrapper, GoogleMap, Marker } from "@googlemaps/react-wrapper";
import MapRender from "./mapRender";

const LocationAuth = () => {
    const {
        coords: initialCoords,
        isGeolocationAvailable,
        isGeolocationEnabled,
        positionError,
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

    // timestamp를 Date 객체로 변환
    const timestampDate = timestamp ? new Date(timestamp) : null;
    // 날짜 형식으로 변환 (예: "2023-09-01 14:30:00")
    const timestampString = timestampDate ? timestampDate.toLocaleString() : "N/A";

    // 기준 위도, 경도 및 오차 범위 설정
    const baseLatitude = 37.3387;
    const baseLongitude = 126.7345;
    const errorRange = 0.000002;

    const [currentCoords, setCurrentCoords] = useState(initialCoords);
    const [isWithinRange, setIsWithinRange] = useState(false);

    // 현재 위치와 기준 위치 간의 거리 계산
    const calculateDistance = () => {
        if (currentCoords) {
            const distance = Math.sqrt(
                Math.pow(currentCoords.latitude - baseLatitude, 3) +
                Math.pow(currentCoords.longitude - baseLongitude, 3)
            );
            return distance;
        }
        return null;
    };

    const handleSyncLocation = () => {
        setCurrentCoords(initialCoords);
    };

    useEffect(() => {
        const distance = calculateDistance();
        // 오차 범위 내에 위치한 경우
        if (distance !== null && distance <= errorRange) {
            setIsWithinRange(true);
        } else {
            setIsWithinRange(false);
        }
    }, [currentCoords]);

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : (
        <div>
            <table style={{ width: "400px" }}>
                <tbody>
                <tr>
                    <td style={{ width: "50%", textAlign: "left" }}>위도</td>
                    <td style={{ width: "300%" }}>{currentCoords?.latitude || "N/A"}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: "left" }}>경도</td>
                    <td>{currentCoords?.longitude || "N/A"}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: "left" }}>정확도</td>
                    <td>{currentCoords?.accuracy || "N/A"}</td>
                </tr>
                <tr>
                    <td style={{ textAlign: "left" }}>날짜</td>
                    <td>{timestampString}</td>
                </tr>
                <tr>
                    <td colSpan="2" style={{ textAlign: "left" }}>
                        <MapRender
                            latitude={currentCoords?.latitude || baseLatitude}
                            longitude={currentCoords?.longitude || baseLongitude}
                        />
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
