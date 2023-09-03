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

    // 직사각형 연구실의 최소 경도, 최대 경도, 최소 위도, 최대 위도 설정
    const minLongitude = 126.734449;
    const maxLongitude = 126.7344639;
    const minLatitude = 37.3387144;
    const maxLatitude = 37.3387185;

    const [currentCoords, setCurrentCoords] = useState(initialCoords);
    const [isWithinRange, setIsWithinRange] = useState(false);

    // 현재 위치가 주어진 범위 내에 있는지 확인
    const isWithinLabRange = () => {
        if (
            currentCoords &&
            currentCoords.longitude >= minLongitude &&
            currentCoords.longitude <= maxLongitude &&
            currentCoords.latitude >= minLatitude &&
            currentCoords.latitude <= maxLatitude
        ) {
            return true;
        }
        return false;
    };

    const handleSyncLocation = () => {
        setCurrentCoords(initialCoords);
    };

    useEffect(() => {
        const withinRange = isWithinLabRange();
        setIsWithinRange(withinRange);
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
                            latitude={currentCoords?.latitude || minLatitude}
                            longitude={currentCoords?.longitude || minLongitude}
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
