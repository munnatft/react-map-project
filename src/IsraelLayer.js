import { sourceId } from "./const";

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
    "line-width": 4,
  },
};

export const Israel_District_Layer = {
  id: "israel_district_layer",
  type: "fill",
  source: sourceId.district,
  layout: {},
  paint: {
    "fill-color": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      "#64bdbb",
      ["boolean", ["feature-state", "clicked"], false],
      "#888888",
      "transparent"
    ],
    "fill-opacity": 0.2,
  },
};

export const Israel_District_Border_Layer = {
  id: "israel-district-border-layer",
  type: "line",
  source: sourceId.district,
  layout: {},
  paint: {
    "line-color": "#c4c1b1",
    "line-opacity":0.8,
    "line-width": 2.8,
  },
};

export const Israel_City_Layer = {
  id: "israel-city-layer",
  type: "fill",
  source: sourceId.city,
  layout: {},
  paint: {
    "fill-color": "#b37400",
    "fill-opacity": [
      "case",
      ["boolean", ["feature-state", "hover"], false],
      1,
      0,
    ],
  },
};

export const Israel_City_Border_Layer = {
  id: "israel-city-border-layer",
  type: "line",
  source: sourceId.city,
  layout: {},
  paint: {
    "line-color": "#C1BDA9",
    "line-width": 1,
  },
};
