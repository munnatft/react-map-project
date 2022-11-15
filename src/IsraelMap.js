import React, { useCallback, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Map, { NavigationControl, Layer, Source, Popup } from "react-map-gl";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layer";
import {
  Israel_City_Border_Layer,
  Israel_City_Layer,
  Israel_District_Border_Layer,
  Israel_District_Layer,
} from "./IsraelLayer";
import { PLACES_IN_ISRAEL } from "./Israel/places";
import { ISRAEL_DISTRICTS_DATA } from "./Israel/district";
import { ISRAEL_CITIES } from "./Israel/cities";

let hoverStatedId = null;
let clickedId = null;
const IsraelMap = () => {
  const [viewState, setViewState] = useState({
    longitude: 34.8516,
    latitude: 31.0461,
    zoom: 5,
  });
  const mapRef = useRef(null);
  const [pointDetails, setPointDetails] = useState(null);

  const onMapLoad = useCallback(() => {
    mapRef.current.on("mousemove", Israel_District_Layer.id, (e) => {
      if (e.features.length > 0) {
        if (hoverStatedId !== null) {
          mapRef.current.setFeatureState(
            { source: "israel_district", id: hoverStatedId },
            { hover: false }
          );
        }
        hoverStatedId = e.features[0].id;
        mapRef.current.setFeatureState(
          { source: "israel_district", id: hoverStatedId },
          { hover: true }
        );
      }
    });

    mapRef.current.on("mouseleave", Israel_District_Layer.id, () => {
      if (hoverStatedId !== null) {
        mapRef.current.setFeatureState(
          { source: "israel_district", id: hoverStatedId },
          { hover: false }
        );
      }
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
            { clicked: true }
          );
        }
      });

  }, []);

  const onMapPointClickHandler = (event) => {
    if (
      event.features.length > 0 &&
      event.features[0].layer.id === unclusteredPointLayer.id
    ) {
      console.log(mapRef.current);
      setPointDetails(event.features[0]);
    }
  };

  const onPopUpCloseHandler = () => {
    setPointDetails(null);
  };

  const onDistrictDoubleCLickHandler = (e) => {
    if (
      e.features.length > 0 &&
      e.features[0].layer.id === Israel_District_Layer.id
    ) {
      console.log(e.features[0]);
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
        interactiveLayerIds={[
          clusterLayer.id,
          unclusteredPointLayer.id,
          clusterCountLayer.id,
          Israel_District_Layer.id,
          Israel_City_Layer.id,
        ]}
        onLoad={onMapLoad}
        onDblClick={onDistrictDoubleCLickHandler}
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
        <Source id="israel_city" type="geojson" data={ISRAEL_CITIES}>
          <Layer {...Israel_City_Layer} beforeId={clusterLayer.id} />
          <Layer {...Israel_City_Border_Layer} beforeId={clusterLayer.id} />
        </Source>
        <Source
          id="israel_district"
          type="geojson"
          data={ISRAEL_DISTRICTS_DATA}
        >
          <Layer {...Israel_District_Layer} beforeId={clusterLayer.id} />
          <Layer {...Israel_District_Border_Layer} beforeId={clusterLayer.id} />
        </Source>
        <NavigationControl position="top-right" showCompass={false} />
        {pointDetails && (
          <Popup
            longitude={pointDetails.geometry.coordinates[0]}
            latitude={pointDetails.geometry.coordinates[1]}
          >
            <div className="marker">{pointDetails.properties.name}</div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default IsraelMap;
