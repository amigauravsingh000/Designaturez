const GRID_CONFIG = { rows: 12, cols: 12 };

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const getGridConfig = () => GRID_CONFIG;

export const normalizeToGrid = (row, col, rowSpan = 1, colSpan = 1) => {
  const rows = GRID_CONFIG.rows;
  const cols = GRID_CONFIG.cols;

  const safeRowSpan = clamp(rowSpan, 1, rows);
  const safeColSpan = clamp(colSpan, 1, cols);

  const maxRow = rows - safeRowSpan;
  const maxCol = cols - safeColSpan;

  return {
    row: clamp(row, 0, maxRow),
    col: clamp(col, 0, maxCol),
    rowSpan: safeRowSpan,
    colSpan: safeColSpan,
    gridRows: rows,
    gridCols: cols,
  };
};

export const getZoneFromGrid = (
  row,
  col,
  rows = GRID_CONFIG.rows,
  cols = GRID_CONFIG.cols
) => {
  if (rows === 0 || cols === 0) return "center";

  const verticalRatio = row / (rows - 1 || 1);
  const horizontalRatio = col / (cols - 1 || 1);

  const verticalBand =
    verticalRatio < 0.33 ? "north" : verticalRatio > 0.66 ? "south" : "center";
  const horizontalBand =
    horizontalRatio < 0.33
      ? "west"
      : horizontalRatio > 0.66
      ? "east"
      : "center";

  if (verticalBand === "center" && horizontalBand === "center") return "center";
  if (verticalBand === "center") return horizontalBand;
  if (horizontalBand === "center") return verticalBand;
  return `${verticalBand}-${horizontalBand}`;
};

export const getZoneDescriptor = (zone) => {
  switch (zone) {
    case "north":
      return "North zone (cool, calm lighting)";
    case "south":
      return "South zone (warm, active energy)";
    case "east":
      return "East zone (morning sunlight)";
    case "west":
      return "West zone (evening light)";
    case "northwest":
    case "north-west":
      return "Northwest corner (guest-friendly, transitional)";
    case "northeast":
    case "north-east":
      return "Northeast corner (spiritual, sacred)";
    case "southeast":
    case "south-east":
      return "Southeast corner (fire zone, kitchen ideal)";
    case "southwest":
    case "south-west":
      return "Southwest corner (stability, master bedroom zone)";
    case "center":
      return "Central zone (brahmasthan, circulation-heavy)";
    default:
      return "Mixed zone";
  }
};

const FRONT_GATE_MESSAGES = {
  east: "East-facing entrance welcomes morning light and prosperity.",
  west: "West-facing entrance captures evening light—keep it warm and inviting.",
  north:
    "North-facing entrance symbolizes growth—maintain open, bright frontage.",
  south: "South-facing entrance needs grounding elements for balance.",
};

export const getFrontGateDescriptor = (direction = "east") => {
  const dir = direction.toLowerCase();
  return FRONT_GATE_MESSAGES[dir] || FRONT_GATE_MESSAGES.east;
};

export const isNearFrontGate = (
  row,
  col,
  direction = "east",
  rows = GRID_CONFIG.rows,
  cols = GRID_CONFIG.cols
) => {
  const threshold = 2;
  const dir = direction.toLowerCase();

  switch (dir) {
    case "east":
      return col >= cols - threshold;
    case "west":
      return col <= threshold;
    case "north":
      return row <= threshold;
    case "south":
      return row >= rows - threshold;
    default:
      return col >= cols - threshold;
  }
};

export const getEntranceBand = (direction = "east") => direction.toLowerCase();

export const getPlacementMeta = (row, col, rowSpan, colSpan, direction) => {
  const normalized = normalizeToGrid(row, col, rowSpan, colSpan);
  const zone = getZoneFromGrid(
    normalized.row,
    normalized.col,
    normalized.gridRows,
    normalized.gridCols
  );

  return {
    ...normalized,
    zone,
    zoneDescription: getZoneDescriptor(zone),
    nearFront: isNearFrontGate(
      normalized.row,
      normalized.col,
      direction,
      normalized.gridRows,
      normalized.gridCols
    ),
  };
};

export const describeFrontGateIdealRooms = () => [
  {
    type: "success",
    message:
      "Living room or lounge near the entrance creates a welcoming arrival.",
    severity: "low",
  },
  {
    type: "tip",
    message: "A foyer or reception niche keeps the main living areas private.",
    severity: "low",
  },
];

export const mapRatioToPosition = (value) => {
  if (value < 0.33) return "near-start";
  if (value > 0.66) return "near-end";
  return "mid";
};
