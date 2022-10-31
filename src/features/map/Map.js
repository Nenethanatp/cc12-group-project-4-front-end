import {
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearPostLocationIds,
  setLocation,
  setPostLocationIds,
} from "../../store/mapSlice";
import CurrentButton from "./CurrentButton";

function Map({ handleOpenPost, mapCenter }) {
  const [marker, setMarker] = useState();

  const dispatch = useDispatch();

  const mapRef = useRef();

  const location = useSelector((state) => state.map.location);
  const posts = useSelector((state) => state.post.items);
  const favorites = useSelector((state) => state.favorite.items);

  const options = useMemo(
    () => ({
      mapId: "3713c985864a0e82",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  useEffect(() => {
    if (location) {
      mapRef.current?.panTo({ lat: location.lat, lng: location.lng });
      setMarker({ lat: location.lat, lng: location.lng });
    }
  }, [location]);

  const onMapLoad = useCallback((map) => (mapRef.current = map), []);
  const onMapClick = useCallback(
    (e) => {
      dispatch(setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() }));
    },
    [dispatch]
  );

  const handleClickMyLocation = (input) => {
    dispatch(setLocation(input));
  };

  const getGoogleClusterInlineSvg = function (color) {
    let encoded = window.btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" height="120" width="120">
        <circle cx="60px" cy="60px" r="36px" fill="${color}"/>
        <circle cx="60px" cy="60px" r="48px" fill-opacity="0.5" fill="${color}"/>
        <circle cx="60px" cy="60px" r="60px" fill-opacity="0.20" fill="${color}"/>
      </svg>`
    );
    return "data:image/svg+xml;base64," + encoded;
  };

  const clusterStyles = [
    {
      width: 40,
      height: 40,
      url: getGoogleClusterInlineSvg("#F0D500"),
      textColor: "white",
      textSize: 12,
    },
    {
      width: 50,
      height: 50,
      url: getGoogleClusterInlineSvg("#F32013"),
      textColor: "white",
      textSize: 14,
    },
    {
      width: 60,
      height: 60,
      url: getGoogleClusterInlineSvg("#CA0B00"),
      textColor: "white",
      textSize: 16,
    },
  ];

  return (
    <div className="h-screen relative">
      <CurrentButton handleClickMyLocation={handleClickMyLocation} />
      <div className="h-full w-full">
        <GoogleMap
          zoom={11}
          center={mapCenter}
          mapContainerClassName="h-full w-full"
          options={options}
          onLoad={onMapLoad}
          onClick={onMapClick}
        >
          {marker && (
            <Marker
              key={marker.lat + marker.lng}
              position={marker}
              onClick={() => {
                dispatch(setLocation({ lat: marker.lat, lng: marker.lng }));
                dispatch(clearPostLocationIds());
                handleOpenPost();
              }}
            />
          )}

          {favorites &&
            favorites.map((favorite) => (
              <Marker
                key={`marker_${favorite.id}`}
                position={{
                  lat: +favorite.latitude,
                  lng: +favorite.longitude,
                }}
                label={{
                  text: favorite.name,

                  className: "mt-[-60px] bg-white bg-opacity-70 p-1",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
                icon="/fav-pin.png"
                onClick={() => {
                  dispatch(
                    setLocation({
                      lat: +favorite.latitude,
                      lng: +favorite.longitude,
                    })
                  );
                }}
              />
            ))}

          <MarkerClusterer
            onClick={(e) => {
              dispatch(
                setLocation({
                  lat: e.getCenter().lat(),
                  lng: e.getCenter().lng(),
                })
              );
              dispatch(
                setPostLocationIds(e.getMarkers().map((el) => el.locationId))
              );
              handleOpenPost();
            }}
            title="cluster"
            zoomOnClick={false}
            // maxZoom={15}
            gridSize={45}
            styles={clusterStyles}
          >
            {(clusterer) =>
              posts.map((el, index) => (
                <Marker
                  key={`marker_${el.id}`}
                  options={{
                    locationId: el.Location.id,
                  }}
                  position={{
                    lat: +el.Location.latitude,
                    lng: +el.Location.longitude,
                  }}
                  clusterer={clusterer}
                  onClick={() => {
                    dispatch(
                      setLocation({
                        lat: +el.Location.latitude,
                        lng: +el.Location.longitude,
                      })
                    );
                    dispatch(setPostLocationIds([el.locationId]));
                    handleOpenPost();
                  }}
                  icon={{
                    path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
                    scale: 1.5,
                    fillColor: `${
                      el.Type.id === 1
                        ? "red"
                        : el.Type.id === 2
                        ? "blue"
                        : el.Type.id === 3
                        ? "yellow"
                        : ""
                    }`,
                    fillOpacity: 1,
                    // strokeOpacity: 0.5,
                    anchor: { x: 12, y: 24 },
                  }}
                />
              ))
            }
          </MarkerClusterer>
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
