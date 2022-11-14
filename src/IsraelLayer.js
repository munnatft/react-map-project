export const Israel_Layer = {
  id: "israel_layer",
  type: "fill",
  source: "israel_source",
  layout: {},
  paint: {
    "fill-color": "#F7F1D9",
    "fill-opacity": 0.3,
  },
};

export const Israel_Border_Layer = {
  id: "israel_border_layer",
  type: "line",
  source: "israel_source",
  layout: {},
  paint: {
    "line-color": "#C1BDA9",
    "line-width": 3,
  },
};

export const Israel_District_Layer = {
  id: "israel-district-layer",
  type: "fill",
  source: "israel_district",
  layout: {},
  paint: {
    "fill-color": "#F7F1D9",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.65,
      0,
    ],
  },
};

export const Israel_District_Border_Layer = {
  id: "israel-district-border-layer",
  type: "line",
  source: "israel_district",
  layout: {},
  paint: {
    "line-color": "#C1BDA9",
    "line-width": 2,
  },
};

export const Israel_City_Layer = {
  id: "israel-city-layer",
  type: "fill",
  source: "israel_city",
  layout: {},
  paint: {
    "fill-color": "#F7F1D9",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      0.65,
      0,
    ],
  },
};

export const Israel_City_Border_Layer = {
  id: "israel-city-border-layer",
  type: "line",
  source: "israel_city",
  layout: {},
  paint: {
    "line-color": "#C1BDA9",
    "line-width": 1,
  },
};
