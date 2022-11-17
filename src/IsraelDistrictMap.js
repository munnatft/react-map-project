import React, { useCallback, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Map, { NavigationControl, Layer, Source, Popup } from "react-map-gl";
import {
  Israel_District_Border_Layer,
  Israel_District_Layer,
} from "./IsraelLayer";
import { ISRAEL_DISTRICTS_DATA } from "./Israel/district";

const IsraelDistrictMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 34.8516,
    latitude: 31.0461,
    zoom: 7,
  });
  const mapRef = useRef(null);
  const [data, setData] = useState(null);

  const onMapLoad = useCallback(() => {
    let hoverStatedId = null;
    let clickedId = null;
    mapRef.current.getCanvas().style.cursor = 'default';
    mapRef.current.on("mousemove", Israel_District_Layer.id, (e) => {
      console.log("mouse move event fired")
      if (e.features.length > 0) {
        if (hoverStatedId) {
          mapRef.current.setFeatureState(
            { source: "israel_district", id: hoverStatedId },
            { hover: false }
            );
          }
        hoverStatedId = e.features[0].id;
        setData({ ...e.lngLat, ...e.features[0].properties });
        if (hoverStatedId !== clickedId) {
          mapRef.current.setFeatureState(
            { source: "israel_district", id: hoverStatedId },
            { hover: true }
          );
        }
      }
    });

    mapRef.current.on("mouseleave", Israel_District_Layer.id, (e) => {
      console.log("mouse leave event fired")
      console.log(e)
      if (hoverStatedId) {
        mapRef.current.setFeatureState(
          { source: "israel_district", id: hoverStatedId },
          { hover: false }
        );
      }
      setData(null);
      hoverStatedId = null;
    });

    mapRef.current.on("click", Israel_District_Layer.id, (e) => {
      if (e.features.length > 0) {
        if (clickedId) {
          mapRef.current.setFeatureState(
            { source: "israel_district", id: clickedId },
            { clicked: false }
          );
        }
        clickedId = e.features[0].id;
        mapRef.current.setFeatureState(
          { source: "israel_district", id: clickedId },
          { clicked: true, hover: false }
        );
      }
    });
  }, []);

  const onDistrictAreaClickHandler = (event) => {
    if (
      event.features.length > 0 &&
      event.features[0].layer.id === Israel_District_Layer.id
    ) {
      console.log(event.features[0]);
    }
  };

  return (
    <div className="App">
      <Map
        ref={mapRef}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        style={{
          width: "100vw",
          height: "100vh",
        }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/light-v10"
        interactiveLayerIds={[Israel_District_Layer.id]}
        onLoad={onMapLoad}
        onDblClick={onDistrictAreaClickHandler}
      >
        <Source
          id="israel_district"
          type="geojson"
          data={ISRAEL_DISTRICTS_DATA}
        >
          <Layer {...Israel_District_Layer} />
          <Layer {...Israel_District_Border_Layer} />
        </Source>
        <NavigationControl position="top-right" showCompass={false} />
        {data && (
          <Popup longitude={data.lng} latitude={data.lat} offset={30} >
            <div className="marker">{data.name}</div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default IsraelDistrictMap;
