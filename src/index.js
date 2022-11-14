import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MapArea from './MapArea';
import IsraelMap from './IsraelMap';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <MapArea /> */}
    <IsraelMap></IsraelMap>
  </React.StrictMode>
);

