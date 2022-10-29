import {
  Circle,
  GoogleMap,
  InfoWindow,
  Marker,
  MarkerClusterer
} from '@react-google-maps/api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setLocation } from '../../store/mapSlice';

function Map({ handleOpenPost }) {
  const [marker, setMarker] = useState();
  const [selects, setSelects] = useState();

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
      mapId: '3713c985864a0e82',
      disableDefaultUI: true,
      clickableIcon: false
    }),
    []
  );

  // useEffect(() => {
  //   if (location) {
  //     mapRef.current?.panTo(location);
  //   }
  // }, [location]);

  useEffect(() => {
    // console.log(marker);
  }, [marker]);

  const onMapLoad = useCallback((map) => (mapRef.current = map), []);
  const onMapClick = useCallback((e) => {
    setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    dispatch(
      setLocation({ latitude: e.latLng.lat(), longitude: e.latLng.lng() })
    );
  }, []);

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
                handleOpenPost();
              }}
            />
          )}

          <MarkerClusterer
            onClick={(e) => {
              // alert(e.getMarkers()[0].position.lat());
              // alert(e.getMarkers()[0].position.lng()); ---> get position to filter shown posts when click

              setSelects(e.getMarkers());
              setMarker({
                lat: e.getMarkers()[0].getPosition().lat(),
                lng: e.getMarkers()[0].getPosition().lng()
              });
              dispatch(
                setLocation({
                  latitude: e.getMarkers()[0].getPosition().lat(),
                  longitude: e.getMarkers()[0].getPosition().lng()
                })
              );
              handleOpenPost();
            }}
            title="cluster"
            zoomOnClick={false}
          >
            {(clusterer) =>
              posts.map(
                (
                  el // pass down filteredPost from postSlice to map markers on map
                ) => (
                  <Marker
                    key={el.id}
                    position={{
                      lat: +el.Location.latitude,
                      lng: +el.Location.longitude
                    }}
                    clusterer={clusterer}
                    onClick={(e) => {
                      console.log(e);

                      setSelects(e);
                      setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                      dispatch(
                        setLocation({
                          latitude: e.latLng.lat(),
                          longitude: e.latLng.lng()
                        })
                      );

                      handleOpenPost();
                    }}
                    onLoad={() => {
                      console.log({
                        lat: +el.Location.latitude,
                        lng: +el.Location.longitude
                      });
                    }}
                  />
                )
              )
            }
          </MarkerClusterer>
          {/*{location && (*/}
          {/*  <>*/}
          {/*    <Marker*/}
          {/*      position={location}*/}
          {/*      icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"*/}
          {/*    />*/}
          {/*
              <Circle center={location} radius={15000} options={closeOptions} />
              <Circle
                center={location}
                radius={30000}
                options={middleOptions}
              />
              <Circle center={location} radius={45000} options={farOptions} /> */}

          {/*  {selects && (*/}
          {/*    <InfoWindow*/}
          {/*      position={initCenter}*/}
          {/*      onCloseClick={() => {*/}
          {/*        setSelects(null);*/}
          {/*      }}*/}
          {/*    >*/}
          {/*      <div>*/}
          {/*        <h1>hi</h1>*/}
          {/*      </div>*/}
          {/*    </InfoWindow>*/}
          {/*  )}*/}
          {/*</>*/}
          {/* )} */}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;

// const defaultOptions = {
//   strokeOpacity: 0.5,
//   strokeWeight: 2,
//   clickable: false,
//   draggable: false,
//   editable: false,
//   visible: true,
// };

// const closeOptions = {
//   ...defaultOptions,
//   zIndex: 3,
//   fillOpacity: 0.25,
//   strokeColor: "#8BC34A",
//   fillColor: "#8BC34A",
// };

// const middleOptions = {
//   ...defaultOptions,
//   zIndex: 2,
//   fillOpacity: 0.25,
//   strokeColor: "#FBC02D",
//   fillColor: "#FBC02D",
// };

// const farOptions = {
//   ...defaultOptions,
//   zIndex: 1,
//   fillOpacity: 0.25,
//   strokeColor: "#FF5252",
//   fillColor: "#FF5252",
// };
