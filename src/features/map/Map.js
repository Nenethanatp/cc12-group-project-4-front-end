import { GoogleMap, Marker, MarkerClusterer } from "@react-google-maps/api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearPostLocationIds,
  setLocation,
  setPostLocationIds,
} from "../../store/mapSlice";

function Map({ handleOpenPost }) {
  const [marker, setMarker] = useState();

  const dispatch = useDispatch();

  const mapRef = useRef();

  const location = useSelector((state) => state.map.location);
  const posts = useSelector((state) => state.post.items);

  const initCenter = useMemo(() => ({ lat: 13.75, lng: 100.5 }), []);

  // const center = useMemo(() => {
  //   return navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       console.log(position);
  //       return {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //     },
  //     () => ({ lat: 13.75, lng: 100.5 })
  //   );
  // }, []);

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
      setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      dispatch(setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() }));
    },
    [dispatch]
  );

  return (
    <div className="h-screen">
      <div className="h-full w-full">
        <GoogleMap
          zoom={11}
          center={initCenter}
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
                dispatch(clearPostLocationIds());
                handleOpenPost();
              }}
            />
          )}

          <MarkerClusterer
            onClick={(e) => {
              dispatch(
                setPostLocationIds(e.getMarkers().map((el) => el.locationId))
              );
              handleOpenPost();
            }}
            title="cluster"
            zoomOnClick={false}
          >
            {(clusterer) =>
              posts.map((el) => (
                <Marker
                  key={el.id}
                  options={{
                    locationId: el.Location.id,
                  }}
                  position={{
                    lat: +el.Location.latitude,
                    lng: +el.Location.longitude,
                  }}
                  clusterer={clusterer}
                  onClick={() => {
                    dispatch(setPostLocationIds([el.locationId]));
                    handleOpenPost();
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
