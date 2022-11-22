import React, { useCallback, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Map, { NavigationControl, Layer, Source, Popup } from "react-map-gl";
import {
  Israel_District_Border_Layer,
  Israel_District_Layer,
} from "./IsraelLayer";
import { ISRAEL_DISTRICTS_DATA } from "./Israel/district";
import { sourceId } from "./const";

const IsraelDistrictMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 34.8516,
    latitude: 31.0461,
    zoom: 7,
  });
  const mapRef = useRef(null);
  const [data, setData] = useState(null);
  const hoverStateIdRef = useRef(null);
  const clickedIdRef = useRef(null);

  const onMapLoad = useCallback(() => {
    mapRef.current.getCanvas().style.cursor = "default";
    mapRef.current.on("mousemove", Israel_District_Layer.id, (e) => {
      if (e.features.length > 0) {
        if (hoverStateIdRef.current) {
          mapRef.current.setFeatureState(
            { source: sourceId.district, id: hoverStateIdRef.current },
            { hover: false }
          );
        }
        hoverStateIdRef.current = e.features[0].id;
        setData({ ...e.lngLat, ...e.features[0].properties });
        if (hoverStateIdRef.current !== clickedIdRef.current) {
          mapRef.current.setFeatureState(
            { source: sourceId.district, id: hoverStateIdRef.current },
            { hover: true }
          );
        }
      }
    });

    mapRef.current.on("mouseleave", Israel_District_Layer.id, (e) => {
      if (hoverStateIdRef.current) {
        mapRef.current.setFeatureState(
          { source: sourceId.district, id: hoverStateIdRef.current },
          { hover: false }
        );
      }
      setData(null);
      hoverStateIdRef.current = null;
    });

    mapRef.current.on("click", Israel_District_Layer.id, (e) => {
      if (e.features.length > 0) {
        if (clickedIdRef.current) {
          mapRef.current.setFeatureState(
            { source: sourceId.district, id: clickedIdRef.current },
            { clicked: false }
          );
        }
        clickedIdRef.current = e.features[0].id;
        mapRef.current.setFeatureState(
          { source: sourceId.district, id: clickedIdRef.current },
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
          id={sourceId.district}
          type="geojson"
          data={ISRAEL_DISTRICTS_DATA}
        >
          <Layer {...Israel_District_Layer} />
          <Layer {...Israel_District_Border_Layer} />
        </Source>
        <NavigationControl position="top-right" showCompass={false} />
        {data && (
          <Popup longitude={data.lng} latitude={data.lat} offset={30}>
            <div className="marker">{data.name}</div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default IsraelDistrictMap;
