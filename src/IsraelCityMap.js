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
import Card from "./Card/Card";
import { sourceId } from "./const";

const lng = 34.8516;
const lat = 31.0461;

const IsraelCityMap = () => {
  const mapRef = useRef(null);
  const [viewState, setViewState] = useState({
    longitude: lng,
    latitude: lat,
    zoom: 7,
  });
  const [pointData, setPointData] = useState(null);
  const hoverPointIdRef = useRef(null);
  const hoverStateIdRef = useRef(null);

  const onMapLoad = useCallback(() => {
    mapRef.current.getCanvas().style.cursor = "default";
    mapRef.current.on("mousemove", Israel_City_Layer.id, (e) => {
      if (e.features.length > 0) {
        if (hoverStateIdRef.current) {
          mapRef.current.setFeatureState(
            { source: sourceId.city, id: hoverStateIdRef.current },
            { hover: false }
          );
        }
        hoverStateIdRef.current = e.features[0].id;

        mapRef.current.setFeatureState(
          { source: sourceId.city, id: hoverStateIdRef.current },
          { hover: true }
        );
      }
    });

    mapRef.current.on("mouseleave", Israel_City_Layer.id, () => {
      if (hoverStateIdRef.current) {
        mapRef.current.setFeatureState(
          { source: sourceId.city, id: hoverStateIdRef.current },
          { hover: false }
        );
      }
      hoverStateIdRef.current = null;
    });
  }, []);

  const onMapMarkerHoverHandler = (e) => {
    if ( e.features.length > 0 && e.features[0].layer.id === unclusteredPointLayer.id ) {
      mapRef.current.getCanvas().style.cursor = "pointer";
      hoverPointIdRef.current = e.features[0].id;

      mapRef.current.setFeatureState(
        { source: sourceId.place, id: hoverPointIdRef.current },
        { onHover: true }
      );
      mapRef.current.removeFeatureState(
        { source: sourceId.city, id: hoverStateIdRef.current }
      );
      setPointData(e.features[0]);
    } else {
      mapRef.current.getCanvas().style.cursor = "default";
      mapRef.current.setFeatureState(
        { source: sourceId.place, id: hoverPointIdRef.current },
        { onHover: false }
      );
      hoverPointIdRef.current = null;
      setPointData(null);
    }
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
    >
      <Source
        id={sourceId.place}
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
      <Source id={sourceId.city} type="geojson" data={ISRAEL_CITIES}>
        <Layer {...Israel_City_Layer} beforeId={clusterLayer.id} />
        <Layer {...Israel_City_Border_Layer} beforeId={clusterLayer.id} />
      </Source>
      <Source id={sourceId.district} type="geojson" data={ISRAEL_DISTRICTS_DATA}>
        <Layer {...Israel_District_Border_Layer} beforeId={clusterLayer.id} />
      </Source>
      <NavigationControl position="top-right" showCompass={false} />
      {pointData && (
        <Popup
          longitude={pointData.geometry.coordinates[0]}
          latitude={pointData.geometry.coordinates[1]}
          offset={15}
        >
          <Card
            title={pointData.properties.title}
            city={pointData.properties.city}
            fullText={pointData.properties.fullText}
          />
        </Popup>
      )}
    </Map>
  );
};
export default IsraelCityMap;
