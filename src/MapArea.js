import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  Layer,
  Source,
  Popup,
} from "react-map-gl";
import {
  areaLayer,
  clusterCountLayer,
  clusterLayer,
  polygonBorderLayer,
  unclusteredPointLayer,
  UnitedStatesBorderLayer,
  UnitedStatesLayer,
} from "./layer";
import logo from "./logo.svg";
import { US_DATA } from "./data";

let renderCount = 0;
const MapArea = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });
  console.log("MapArea rendered - ", ++renderCount)
  const [pointData, setPointData] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    let hoverStatedId = null;
    mapRef.current.on("mousemove", "area-layer", (e) => {
      if (e.features.length > 0) {
        if (hoverStatedId !== null) {
          mapRef.current.setFeatureState(
            { source: "smallAreaOfUnitedStates", id: hoverStatedId },
            { hover: false }
          );
        }
        hoverStatedId = e.features[0].id;
        mapRef.current.setFeatureState(
          { source: "smallAreaOfUnitedStates", id: hoverStatedId },
          { hover: true }
        );
      }
    });

    mapRef.current.on("mousemove", unclusteredPointLayer.id, (e) => {
      mapRef.current.getCanvas().style.cursor = 'pointer';
    })

    mapRef.current.on("mouseleave", unclusteredPointLayer.id, (e) => {
      mapRef.current.getCanvas().style.cursor = 'grab';
    })

    mapRef.current.on("mouseleave", "area-layer", () => {
      if (hoverStatedId !== null) {
        mapRef.current.setFeatureState(
          { source: "smallAreaOfUnitedStates", id: hoverStatedId },
          { hover: false }
        );
      }
      hoverStatedId = null;
    });
  });

  const onMapPointClickHandler = (event) => {
    event.preventDefault();
    // const feature = event.features[0];
    // console.log(feature);
    // console.log(mapRef.current)
    // console.log(mapRef.current.getLayer("area-layer"))
  };

  const onPopUpCloseHandler = () => {
    setPointData(null);
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
          areaLayer.id,
        ]}
        onMouseEnter={onMapPointClickHandler}
        onMouseLeave={onPopUpCloseHandler}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster={true}
          clusterMaxZoom={22}
          clusterRadius={50}
          generateId={true}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        <Source
          id="smallAreaOfUnitedStates"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson"
          generateId={true}
        >
          <Layer {...areaLayer} beforeId={clusterLayer.id} />
          <Layer {...polygonBorderLayer} beforeId={clusterLayer.id}  />
        </Source>
        <Source id="us_multipolygon" type="geojson" data={US_DATA}>
          <Layer {...UnitedStatesLayer} beforeId={clusterLayer.id} />
          <Layer {...UnitedStatesBorderLayer} beforeId={clusterLayer.id}  />
        </Source>
        <NavigationControl position="top-right" />
        <FullscreenControl />
        <GeolocateControl />
        {pointData && (
          <Popup
            longitude={pointData.coordinates[0]}
            latitude={pointData.coordinates[1]}
            onClose={onPopUpCloseHandler}
          >
            <div>{pointData.id}</div>
            <img src={logo} alt="logo" />
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default MapArea;
