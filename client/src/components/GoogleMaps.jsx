import React, { useState, useEffect } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";
import storeData from "./dataStores.json";
// import mapStyles from "./mapStyles";
import icon from "../img/icon.jpg";

function Map() {
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      if (e.key === "Escape") {
        setSelectedStore(null);
      }
    };
    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 32.0680377939317, lng: 34.783520380548566 }}
      //   defaultOptions={{ styles: mapStyles }}
    >
      {storeData.features.map((store) => (
        <Marker
          key={store.properties.PARK_ID}
          position={{
            lat: store.geometry.coordinates[0],
            lng: store.geometry.coordinates[1],
          }}
          onClick={() => {
            setSelectedStore(store);
          }}
          icon={{
            // url: icon,
            scaledSize: new window.google.maps.Size(25, 25),
          }}
        />
      ))}

      {selectedStore && (
        <InfoWindow
          onCloseClick={() => {
            setSelectedStore(null);
          }}
          position={{
            lat: selectedStore.geometry.coordinates[0],
            lng: selectedStore.geometry.coordinates[1],
          }}
        >
          <div>
            <h2>{selectedStore.properties.NAME}</h2>
            <p>{selectedStore.properties.ADDRESS}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function GoogleMaps() {
  return (
    <div style={{ width: "30vw", height: "30vh" }}>
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,
        places&key=AIzaSyAslWENYJDBstFgEJ3YMsOz8V-JV5OUpnY`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}
