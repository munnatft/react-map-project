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
  DATA,
  polygonLayer,
  unclusteredPointLayer,
} from "./layer";
import logo from "./logo.svg";

const polygonData = {
  type: "Feature",
  properties: {
    id: "polygon_123456",
    mag: 2.3,
    time: 1507425650893,
    felt: null,
    tsunami: 0,
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-67.13734, 45.13745],
        [-66.96466, 44.8097],
        [-68.03252, 44.3252],
        [-69.06, 43.98],
        [-70.11617, 43.68405],
        [-70.64573, 43.09008],
        [-70.75102, 43.08003],
        [-70.79761, 43.21973],
        [-70.98176, 43.36789],
        [-70.94416, 43.46633],
        [-71.08482, 45.30524],
        [-70.66002, 45.46022],
        [-70.30495, 45.91479],
        [-70.00014, 46.69317],
        [-69.23708, 47.44777],
        [-68.90478, 47.18479],
        [-68.2343, 47.35462],
        [-67.79035, 47.06624],
        [-67.79141, 45.70258],
        [-67.13734, 45.13745],
      ],
    ],
  },
};



const App = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  });

  const [data, setData] = useState(null);
  const [pointData, setPointData] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((res) => res.json())
      .then((data) => {
        // const newData = { ...data, features: [...data.features, polygonData] };
        setData(data);
      });
  }, []);

  const onMapPointClickHandler = (event) => {
    event.preventDefault();
    const feature = event.features[0];
    if (feature.geometry.type === "Polygon") {
      console.log(feature);
    }
    if (feature?.properties?.id) {
      setPointData({
        ...feature.properties,
        ...feature.geometry,
      });
    }
    // console.log(mapRef.current.getMap().getBounds().toArray())
  };

  const onPopUpCloseHandler = () => setPointData(null);

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
          {/* <Layer {...polygonLayer} /> */}
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
