import React, { useCallback, useRef, useState } from "react";
import Map, { Layer, NavigationControl, Popup, Source } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PLACES_IN_ISRAEL } from "./Israel/places";
import { ISRAEL_CITIES } from "./Israel/cities";
import {
  Israel_City_Border_Layer,
  Israel_City_Layer,
  Israel_District_Border_Layer,
} from "./IsraelLayer";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./layer";
import { ISRAEL_DISTRICTS_DATA } from "./Israel/district";
import "./App.css";

const IsraelCityMap = () => {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    longitude: 34.8516,
    latitude: 31.0461,
    zoom: 7,
  });
  const [pointData, setPointData] = useState(null);

  const onMapLoad = useCallback(() => {
    let hoverStatedId = null;
    mapRef.current.on("mousemove", Israel_City_Layer.id, (e) => {
      if (e.features.length > 0) {
        if (hoverStatedId) {
          mapRef.current.setFeatureState(
            { source: "srael_city", id: hoverStatedId },
            { hover: false }
          );
        }
        hoverStatedId = e.features[0].id;

        mapRef.current.setFeatureState(
          { source: "srael_city", id: hoverStatedId },
          { hover: true }
        );
      }
    });

    mapRef.current.on("mouseleave", Israel_City_Layer.id, () => {
      if (hoverStatedId) {
        mapRef.current.setFeatureState(
          { source: "srael_city", id: hoverStatedId },
          { hover: false }
        );
      }
      hoverStatedId = null;
    });
  }, []);

  const onMapMarkerHoverHandler = (e) => {
    if (
      e.features.length > 0 &&
      e.features[0].layer.id === unclusteredPointLayer.id
    ) {
      setPointData(e.features[0]);
    }
  };

  const onMapMarkerLeaveHandler = () => {
    setPointData(null);
  };

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      style={{ width: "100vw", height: "100vh" }}
      {...viewState}
      onMove={(evt) => setViewState(evt.viewState)}
      mapStyle="mapbox://styles/mapbox/light-v10"
      interactiveLayerIds={[
        clusterLayer.id,
        unclusteredPointLayer.id,
        clusterCountLayer.id,
        Israel_City_Layer.id,
      ]}
      onLoad={onMapLoad}
      onMouseMove={onMapMarkerHoverHandler}
      onMouseLeave={onMapMarkerLeaveHandler}
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
      <Source id="srael_city" type="geojson" data={ISRAEL_CITIES}>
        <Layer {...Israel_City_Layer} beforeId={clusterLayer.id} />
        <Layer {...Israel_City_Border_Layer} beforeId={clusterLayer.id} />
      </Source>
      <Source id="israel_district" type="geojson" data={ISRAEL_DISTRICTS_DATA}>
        <Layer {...Israel_District_Border_Layer} beforeId={clusterLayer.id} />
      </Source>
      <NavigationControl position="top-right" showCompass={false} />
      {pointData && (
        <Popup
          longitude={pointData.geometry.coordinates[0]}
          latitude={pointData.geometry.coordinates[1]}
          offset={10}
        >
          <div className="marker">{pointData.properties.name}</div>
        </Popup>
      )}
    </Map>
  );
};
export default IsraelCityMap;
