export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "earthquakes",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "earthquakes",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 12,
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "earthquakes",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 5,
    "circle-stroke-width": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      5,
    ],
    "circle-stroke-color": "#8ecae6",
  },
};

export const polygonLayer = (onHover = false) => ({
  id: "polygon-layer",
  type: "fill",
  source: "smallAreaOfUnitedStates",
  layout: {},
  paint: {
    // "fill-outline-color": "#0040c8",
    "fill-color": "#A68777", // blue color fill #FBE7C6
    "fill-opacity": onHover ? 1 : 0.5,
  },
});

export const areaLayer = {
  id: "area-layer",
  type: "fill",
  source: "smallAreaOfUnitedStates",
  layout: {},
  paint: {
    "fill-color": "#627BC1",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0.5,
    ],
  },
};

export const polygonBorderLayer = {
  id: "borders",
  type: "line",
  source: "smallAreaOfUnitedStates",
  layout: {},
  paint: {
    "line-color": "#627BC1",
    "line-width": 2,
  },
};

export const UnitedStatesLayer = {
  id: "united_states",
  type: "fill",
  source: "us_multipolygon",
  layout: {},
  paint: {
    "fill-outline-color": "#F7F1D9",
    "fill-color": "#F7F1D9",
    "fill-opacity": 0.55,
  },
};

export const UnitedStatesBorderLayer = {
  id: "united_states_border_layer",
  type: "line",
  source: "us_multipolygon",
  layout: {},
  paint: {
    "line-color": "#C1BDA9",
    "line-width": 3,
  },
};

export const DATA = {
  type: "FeatureCollection",
  crs: { type: "name", properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" } },

  features: [
    {
      type: "Feature",
      properties: { name: "Parc de la Colline" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.357206347890767, 47.72858763003908],
            [-71.86027854004486, 47.527648291638172],
            [-72.37075892446839, 47.539848426151735],
            [-72.357206347890767, 47.72858763003908],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Centre Paul-Étienne Simard" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.357206347890767, 48.013440900213297],
            [-72.239750684218109, 48.013440900213297],
            [-72.253303260795718, 47.856056000888501],
            [-72.027426984502114, 47.856056000888501],
            [-72.036462035553868, 48.013440900213297],
            [-71.905453795303586, 48.01646283861713],
            [-71.891901218725963, 47.801464984333364],
            [-72.361723873416651, 47.810567474765456],
            [-72.357206347890767, 48.013440900213297],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Loisirs Rivière du Moulin" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-72.194575428959382, 48.33278115872843],
            [-72.018391933450374, 48.33278115872843],
            [-71.846725963467236, 48.251628525276693],
            [-71.950629050562299, 48.107038644740094],
            [-72.203610480011122, 48.107038644740094],
            [-72.397864077623623, 48.221539261269051],
            [-72.194575428959382, 48.33278115872843],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "L'Étoile-du-Nord" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.589227008492543, 47.649521925935176],
            [-71.525981651130337, 47.734664642855655],
            [-71.48532392139748, 47.649521925935169],
            [-71.295587849310877, 47.637347332276697],
            [-71.462736293768117, 47.585573652777313],
            [-71.390455885354172, 47.475766052599219],
            [-71.535016702182091, 47.552045722357242],
            [-71.702165146639345, 47.491030857179695],
            [-71.616332161647762, 47.591667334264848],
            [-71.787998131630914, 47.655608158761908],
            [-71.589227008492543, 47.649521925935176],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Loisirs Lavoie et St-Jean-Baptiste" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.729270299794578, 48.010418784700107],
            [-71.291070323784993, 48.004374022337799],
            [-71.291070323784993, 47.777183877693901],
            [-71.729270299794578, 47.786290622064854],
            [-71.729270299794578, 48.010418784700107],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Loisirs Diamant" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.693130095587605, 48.341790157179155],
            [-71.286552798259123, 48.344792802893032],
            [-71.449183717190522, 48.224548983994914],
            [-71.277517747207369, 48.070827446446337],
            [-71.751857927423927, 48.085918544287573],
            [-71.507911549026844, 48.21551928490868],
            [-71.693130095587605, 48.341790157179155],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Sydenham" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.051641470913779, 47.710352336655504],
            [-70.911598179611758, 47.710352336655504],
            [-70.925150756189367, 47.619080121567436],
            [-70.712827056473373, 47.616034965734443],
            [-70.721862107525112, 47.448278226184989],
            [-70.857387873301292, 47.448278226184989],
            [-70.852870347775408, 47.552045722357249],
            [-71.056158996439635, 47.552045722357249],
            [-71.051641470913779, 47.710352336655504],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Saint-Luc" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-71.110369302750115, 47.798430466372736],
            [-70.902563128560018, 47.983211774835986],
            [-70.699274479895777, 47.789325849015306],
            [-71.110369302750115, 47.798430466372736],
          ],
        ],
      },
    },
    {
      type: "Feature",
      properties: { name: "Loisirs du Fjord du Saguenay" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-70.988396113551573, 48.32977780546792],
            [-70.812212618042579, 48.32977780546792],
            [-70.807695092516681, 48.209498600656133],
            [-70.631511597007702, 48.209498600656147],
            [-70.636029122533571, 48.079882636349602],
            [-71.146509506957088, 48.082900678850329],
            [-71.151027032482972, 48.212509031269981],
            [-70.983878588025689, 48.209498600656133],
            [-70.988396113551573, 48.32977780546792],
          ],
        ],
      },
    },
  ],
};
