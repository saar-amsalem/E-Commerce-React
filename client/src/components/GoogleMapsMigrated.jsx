import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript
} from "@react-google-maps/api";
import storeData from "./dataStores.json";

const containerStyle = {
  width: "30vw",
  height: "30vh"
};

const center = {
  lat: 32.0680377939317,
  lng: 34.783520380548566
};

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
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={(map) => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
      }}
    >
      {storeData.features.map((store) => (
        <Marker
          key={store.properties.PARK_ID}
          position={{
            lat: store.geometry.coordinates[0],
            lng: store.geometry.coordinates[1]
          }}
          onClick={() => {
            setSelectedStore(store);
          }}
          icon={{
            url: "marker-icon-url", // Replace with your icon URL
            scaledSize: new window.google.maps.Size(25, 25)
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
            lng: selectedStore.geometry.coordinates[1]
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

export default function GoogleMaps() {
  return (
    <div style={containerStyle}>
      <LoadScript
        googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      >
        <Map />
      </LoadScript>
    </div>
  );
}
