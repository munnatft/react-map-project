import React, { useCallback, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Map, { NavigationControl, Layer, Source, Popup } from "react-map-gl";
import { Israel_Border_Layer, Israel_Layer } from "./IsraelLayer";
import { ISRAEL_DATA } from "./Israel/state";
import { sourceId } from "./const";

const IsraelMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 35.5,
    latitude: 31.5,
    zoom: 6.5,
  });
  const mapRef = useRef(null);
  const [data, setData] = useState(null);
  const hoverStateIdRef = useRef(null);
  const clickedIdRef = useRef([]);

  const onMapLoad = useCallback(() => {
    mapRef.current.getCanvas().style.cursor = "default";
    mapRef.current.on("mousemove", Israel_Layer.id, (e) => {
      if (e.features.length > 0) {
        if (hoverStateIdRef.current) {
          mapRef.current.setFeatureState(
            { source: sourceId.state, id: hoverStateIdRef.current },
            { hover: false }
          );
        }
        hoverStateIdRef.current = e.features[0].id;
        setData({ ...e.lngLat, ...e.features[0].properties });
        if (!clickedIdRef.current.includes(hoverStateIdRef.current)) {
          mapRef.current.setFeatureState(
            { source: sourceId.state, id: hoverStateIdRef.current },
            { hover: true }
          );
        }
      }
    });

    mapRef.current.on("mouseleave", Israel_Layer.id, (e) => {
      if (hoverStateIdRef.current) {
        mapRef.current.setFeatureState(
          { source: sourceId.state, id: hoverStateIdRef.current },
          { hover: false }
        );
      }
      setData(null);
      hoverStateIdRef.current = null;
    });

    mapRef.current.on("click", Israel_Layer.id, (e) => {
      if (e.features.length === 0) {
        return;
      }
      const id = e.features[0].id
      if(clickedIdRef.current.includes(id)) {
        mapRef.current.setFeatureState(
          { source: sourceId.state, id: id },
          { clicked: false, hover: true }
        );
        clickedIdRef.current = clickedIdRef.current.filter(featureId => featureId !== id)
      } else {
        clickedIdRef.current.push(id)
        mapRef.current.setFeatureState(
          { source: sourceId.state, id: id },
          { clicked: true, hover: false }
        );
      }
    });
  }, []);

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
        interactiveLayerIds={[Israel_Layer.id]}
        onLoad={onMapLoad}
        // onDblClick={onDistrictAreaClickHandler}
      >
        <Source
          id={sourceId.state}
          type="geojson"
          data={ISRAEL_DATA}
        >
          <Layer {...Israel_Layer} />
          <Layer {...Israel_Border_Layer} />
        </Source>
        <NavigationControl position="top-right" showCompass={false} />
      </Map>
    </div>
  );
};
export default IsraelMap;