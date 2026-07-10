export type TagId =
  | "fruity"
  | "refreshing"
  | "frozen"
  | "strong"
  | "classic"
  | "bitter"
  | "tropical";

export type TagInfo = {
  id: TagId;
  label: string;
  description: string;
};

export const tags: Record<TagId, TagInfo> = {
  fruity: {
    id: "fruity",
    label: "Fruity",
    description: "Sweet, fruit-forward flavour",
  },
  refreshing: {
    id: "refreshing",
    label: "Refreshing",
    description: "Light, crisp and easy-drinking",
  },
  frozen: {
    id: "frozen",
    label: "Frozen",
    description: "Blended over ice, slushy texture",
  },
  strong: {
    id: "strong",
    label: "Strong",
    description: "Spirit-forward and boozy",
  },
  classic: {
    id: "classic",
    label: "Classic",
    description: "A timeless, traditional recipe",
  },
  bitter: {
    id: "bitter",
    label: "Bitter",
    description: "Bold, bittersweet aperitif style",
  },
  tropical: {
    id: "tropical",
    label: "Tropical",
    description: "Tiki-style island flavours",
  },
};
