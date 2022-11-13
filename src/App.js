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
  clusterCountLayer,
  clusterLayer,
  polygonBorderLayer,
  polygonLayer,
  unclusteredPointLayer,
  UnitedStatesBorderLayer,
  UnitedStatesLayer,
} from "./layer";
import logo from "./logo.svg";
import { US_DATA } from "./data";
import { smallAreaOFUS } from "./area";



const App = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  const [data, setData] = useState(null);
  const [pointData, setPointData] = useState(null);
  const [onHover, setOnHover] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const onMapPointClickHandler = (event) => {
    event.preventDefault();
    const feature = event.features[0];
    // console.log(feature)
    // if (feature?.properties?.id) {
    //   setPointData({
    //     ...feature.properties,
    //     ...feature.geometry,
    //   });
    // }
    if(feature.geometry.type === "MultiPolygon" || feature.geometry.type === "Polygon") {
      setOnHover(true)
    }
  };

  const onPopUpCloseHandler = () => {
    setPointData(null)
    setOnHover(false)
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
          polygonLayer().id
        ]}
        onMouseEnter={onMapPointClickHandler}
        onMouseLeave={onPopUpCloseHandler}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data={data}
          cluster={true}
          clusterMaxZoom={22}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        <Source
          id="smallAreaOfUnitedStates"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson"
        >
          <Layer {...polygonLayer(onHover)} beforeId={clusterLayer.id} />
          <Layer {...polygonBorderLayer} />
        </Source>
        <Source
          id="us_multipolygon"
          type="geojson"
          data={US_DATA}
        >
          <Layer {...UnitedStatesLayer} beforeId={clusterLayer.id} />
          <Layer {...UnitedStatesBorderLayer} />
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

export default App;
