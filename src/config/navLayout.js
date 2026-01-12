// Centralized navigation layout configuration
// This is the single source of truth for ForceNav positions and sizes

// Icon size tiers
export const SIZE_TIERS = {
  Artists: "large",
  Releases: "large",
  Home: "regular",
  Products: "medium",
  Merch: "medium",
  Collections: "medium",
  Contests: "medium",
  Live: "regular",
  Nexus: "regular",
  Contact: "small",
  Information: "small",
  Info: "small", // Alias for Information
  Admin: "small",
};

// Base sizes for each tier (in px) - used by Experiments page
export const BASE_SIZES = {
  large: 100,
  medium: 56,
  regular: 44,
  small: 32,
};

// Desktop positions - Custom layout optimized for visual balance
export const EXPANDED_POSITIONS_DESKTOP = [
  { x: 41, y: 38 },   // Home - upper center-left
  { x: 25, y: 29 },   // Artists (large) - upper left
  { x: 73, y: 70 },   // Releases (large) - lower right
  { x: 77, y: 39 },   // Collections - upper right
  { x: 55, y: 52 },   // Contests - center
  { x: 33, y: 58 },   // Merch - center-left
  { x: 60, y: 29 },   // Products - upper center-right
  { x: 44, y: 18 },   // Live - top center
  { x: 16, y: 52 },   // Nexus - left center
  { x: 50, y: 72 },   // Contact (small) - lower center
  { x: 20, y: 69 },   // Information (small) - lower left
  { x: 87, y: 59 },   // Admin (small) - right
];

// Mobile positions - Optimized for vertical orientation
export const EXPANDED_POSITIONS_MOBILE = [
  { x: 44, y: 34 },   // Home
  { x: 32, y: 18 },   // Artists (large)
  { x: 56, y: 69 },   // Releases (large)
  { x: 44, y: 50 },   // Collections
  { x: 78, y: 55 },   // Contests
  { x: 69, y: 39 },   // Merch
  { x: 28, y: 65 },   // Products
  { x: 24, y: 39 },   // Live
  { x: 58, y: 23 },   // Nexus
  { x: 81, y: 76 },   // Contact
  { x: 35, y: 83 },   // Info
  { x: 88, y: 93 },   // Admin
];

// Helper function to get positions with labels (for Experiments page)
export const getDesktopPositionsWithLabels = () => {
  const labels = ["Home", "Artists", "Releases", "Collections", "Contests",
                  "Merch", "Products", "Live", "Nexus", "Contact", "Info", "Admin"];
  return EXPANDED_POSITIONS_DESKTOP.map((pos, idx) => ({
    ...pos,
    label: labels[idx]
  }));
};

export const getMobilePositionsWithLabels = () => {
  const labels = ["Home", "Artists", "Releases", "Collections", "Contests",
                  "Merch", "Products", "Live", "Nexus", "Contact", "Info", "Admin"];
  return EXPANDED_POSITIONS_MOBILE.map((pos, idx) => ({
    ...pos,
    label: labels[idx]
  }));
};

// Display names (Information -> Info)
export const DISPLAY_NAMES = {
  Information: "Info",
};

// Base navigation links (constant)
export const BASE_LINKS = {
  Home: ["Home", true],
  Artists: ["Fingerprint", true],
  Releases: ["Dot", true],
  Collections: ["Honeycomb", true],
  Contests: ["Star", true],
  Merch: ["Merch", true],
  Products: ["Cube", true],
  Live: ["Live", true],
  Nexus: ["Blockchain", true],
  Contact: ["AtSign", true],
  Information: ["Question", true],
};

export const ADMIN_LINKS = { ...BASE_LINKS, Admin: ["Gear", true] };
