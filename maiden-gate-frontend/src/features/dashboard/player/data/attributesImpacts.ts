import type { AttributeKey } from "../types/player";

export type AttributeImpact = {
  label: string;
  level: 1 | 2 | 3;
};

export type AttributeImpactGroup = {
  left: AttributeImpact[];
  right: AttributeImpact[];
};

export const attributeImpacts: Record<AttributeKey, AttributeImpactGroup> = {
  POD: {
    left: [{ label: "ATQ", level: 3 }],
    right: [{ label: "HP", level: 1 }],
  },

  DES: {
    left: [{ label: "EVA", level: 3 }],
    right: [{ label: "INI", level: 2 }],
  },

  RES: {
    left: [{ label: "HP", level: 3 }],
    right: [{ label: "DEF", level: 2 }],
  },

  INT: {
    left: [{ label: "TÉC", level: 3 }],
    right: [{ label: "CD", level: 1 }],
  },

  DET: {
    left: [{ label: "VON", level: 3 }],
    right: [{ label: "PR", level: 1 }],
  },

  PRE: {
    left: [{ label: "SUP", level: 3 }],
    right: [{ label: "SOC", level: 2 }],
  },
};
