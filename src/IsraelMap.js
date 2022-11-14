import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Map, {
  NavigationControl,
  Layer,
  Source,
} from "react-map-gl";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layer";
import {
  Israel_Border_Layer,
  Israel_City_Border_Layer,
  Israel_City_Layer,
  Israel_District_Border_Layer,
  Israel_Layer,
} from "./IsraelLayer";
import { PLACES_IN_ISRAEL } from "./Israel/places";
import { ISRAEL_DISTRICTS_DATA } from "./Israel/district";
import { ISRAEL_DATA } from "./Israel/state";
import { ISRAEL_CITIES } from "./Israel/cities";

let renderCount = 0;
let hoveredLayerId = null;
const IsraelMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 34.8516,
    latitude: 31.0461,
    zoom: 5,
  });
  console.log("MapArea rendered - ", ++renderCount);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    let hoverStatedId = null;
    mapRef.current.on("mousemove", Israel_City_Layer.id, (e) => {
      if (e.features.length > 0) {
        if (hoverStatedId !== null) {
          mapRef.current.setFeatureState(
            { source: "israel_city", id: hoverStatedId },
            { hover: false }
          );
        }
        hoverStatedId = e.features[0].id;
        mapRef.current.setFeatureState(
          { source: "israel_city", id: hoverStatedId },
          { hover: true }
        );
      }
    });

    mapRef.current.on("mouseleave", Israel_City_Layer.id, () => {
      if (hoverStatedId !== null) {
        mapRef.current.setFeatureState(
          { source: "israel_city", id: hoverStatedId },
          { hover: false }
        );
      }
      hoverStatedId = null;
    });
  });

  const onMapPointClickHandler = (event) => {
    event.preventDefault();
    mapRef.current.on("mousemove", unclusteredPointLayer.id, (e) => {
      if(e.features.length > 0) {
        if (hoveredLayerId !== null) {
          mapRef.current.setFeatureState(
            { source: "israel-places-data", id: hoveredLayerId },
            { hover: false }
          );
        }
        hoveredLayerId = e.features[0].id;
        mapRef.current.getCanvas().style.cursor = 'pointer';
        mapRef.current.setFeatureState(
          { source: "israel-places-data", id: hoveredLayerId },
          { hover: true }
        );
      }
    })
  };

  const onPopUpCloseHandler = () => {
    mapRef.current.on("mouseleave", unclusteredPointLayer.id, (e) => {
      if(hoveredLayerId !== null) {
        mapRef.current.getCanvas().style.cursor = 'grab';
        mapRef.current.setFeatureState(
          { source: "israel-places-data", id: hoveredLayerId },
          { hover: false }
        );
      }
      hoveredLayerId = null;
    })
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
        interactiveLayerIds={[
          clusterLayer.id,
          unclusteredPointLayer.id,
          clusterCountLayer.id,
          Israel_City_Layer.id,
        ]}
        onMouseMove={onMapPointClickHandler}
        onMouseLeave={onPopUpCloseHandler}
      >
        <Source
          id="israel-places-data"
          type="geojson"
          data={PLACES_IN_ISRAEL}
          cluster={true}
          clusterMaxZoom={22}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        <Source
          id="israel_city"
          type="geojson"
          data={ISRAEL_CITIES}
        >
          <Layer {...Israel_City_Layer} beforeId={clusterLayer.id} />
          <Layer {...Israel_City_Border_Layer} beforeId={clusterLayer.id} />
        </Source>
        <Source
          id="israel_district"
          type="geojson"
          data={ISRAEL_DISTRICTS_DATA}
        >
          <Layer {...Israel_District_Border_Layer} beforeId={clusterLayer.id} />
        </Source>
        <Source id="israel_source" type="geojson" data={ISRAEL_DATA}>
          <Layer {...Israel_Layer} beforeId={clusterLayer.id} />
          <Layer {...Israel_Border_Layer} beforeId={clusterLayer.id} />
        </Source>
        <NavigationControl position="top-right" showCompass={false} />
      </Map>
    </div>
  );
};

export default IsraelMap;
