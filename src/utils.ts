import { Options } from "vis-network";

/**
 * The base URL for the API.
 */
export function baseUrl() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://127.0.0.1:5000";
  } else {
    return "" // TODO: set production url
  }
};

/**
 * The options for the Vis.js network.
 */
export const networkOptions: Options = {
  nodes: {
    shape: "dot",
  },
  edges: {
    color: {
      inherit: true,
    },
    hoverWidth: 3.3,
    physics: false,
    scaling: {
      min: 0,
      max: 5,
      label: {
        drawThreshold: 1,
      },
    },
    selfReference: {
      angle: 0.7853981633974483,
      renderBehindTheNode: false,
    },
    smooth: false,
    arrows: {
      to: {
        enabled: true,
      },
    },
  },
  physics: {
    hierarchicalRepulsion: {
      centralGravity: 0,
    },
    maxVelocity: 30,
    minVelocity: 0.35,
    solver: "hierarchicalRepulsion",
  },
};