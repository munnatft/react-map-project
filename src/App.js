import React, { useEffect, useState } from "react";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./App.css";
import Map, {
  NavigationControl,
  FullscreenControl,
  GeolocateControl,
  Layer,
  Source,
  Popup,
} from "react-map-gl";
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from "./layer";
import logo from "./logo.svg";


const App = () => {
  const [viewState, setViewState] = useState({
    longitude: -100,
    latitude: 40,
    zoom: 3.5
  });

  const [data, setData] = useState(null);
  const [pointData, setPointData] = useState(null);

  useEffect(() => {
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((res) => res.json())
      .then((data) => setData(data))
  },[])

  const onMapPointClickHandler = (event) => {
    event.preventDefault();
    const feature = event.features[0];
    if(feature?.properties?.id) {
      setPointData({
        ...feature.properties,
        ...feature.geometry
      })
    }
  }

  const onPopUpCloseHandler = () => setPointData(null)

  return (
    <div className="App">
      <Map
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        style={{
          width: "100vw",
          height: "100vh"
        }}
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        interactiveLayerIds={[clusterLayer.id, unclusteredPointLayer.id, clusterCountLayer.id]}
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
        <NavigationControl position="top-right" />
        <FullscreenControl />
        <GeolocateControl />
        {
          pointData && 
          <Popup longitude={pointData.coordinates[0]} latitude={pointData.coordinates[1]} onClose={onPopUpCloseHandler}>
            <div>{pointData.id}</div>
            <img src={logo} alt="logo" />
          </Popup>
        }
      </Map>
    </div>
  );
}

export default App;
