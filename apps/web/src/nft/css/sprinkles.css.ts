import {
  createGlobalTheme,
  createGlobalThemeContract,
} from "@vanilla-extract/css";
import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";

const themeContractValues = {
  colors: {
    neutral1: "",
    neutral2: "",
    neutral3: "",
    surface1: "",
    surface2: "",
    surface3: "",
    surface4: "",
    surface5: "",
    accent1: "",
    accent2: "",

    success: "",
    critical: "",
    scrim: "",

    white: "",

    // OLD NAMES
    deprecated_accentFailureSoft: "",
    deprecated_gold: "",
    deprecated_violet: "",
    deprecated_modalBackdrop: "",
    deprecated_stateOverlayHover: "",
    dropShadow: "",
  },

  shadows: {
    menu: "",
    elevation: "",
    tooltip: "",
    deep: "",
    shallow: "",
  },

  opacity: {
    hover: "0.6",
    pressed: "0.4",
  },
};

export type Theme = typeof themeContractValues;

export const themeVars = createGlobalThemeContract(
  themeContractValues,
  (_, path) => `genie-${path.join("-")}`,
);

export const navDimensions = {
  height: 72,
  verticalPad: 20,
};

const dimensions = {
  "0": "0",
  "2": "2",
  "4": "4px",
  "8": "8px",
  "12": "12px",
  "16": "16px",
  "18": "18px",
  "20": "20px",
  "24": "24px",
  "26": "26px",
  "28": "28px",
  "32": "32px",
  "36": "36px",
  "40": "40px",
  "42": "42px",
  "44": "44px",
  "48": "48px",
  "52": "52px",
  "54": "54px",
  "56": "56px",
  "60": "60px",
  "64": "64px",
  "68": "68px",
  "72": "72px",
  "80": "80px",
  "100": "100px",
  "120": "120px",
  "160": "160px",
  "276": "276px",
  "288": "288px",
  "292": "292px",
  "332": "332px",
  "386": "386px",
  half: "50%",
  full: "100%",
  min: "min-content",
  max: "max-content",
  searchResultsMaxHeight: `calc(100vh - ${navDimensions.verticalPad * 2}px)`,
  viewHeight: "100vh",
  viewWidth: "100vw",
  auto: "auto",
  inherit: "inherit",
};

const spacing = {
  "0": "0",
  "1": "1px",
  "2": "2px",
  "4": "4px",
  "6": "6px",
  "8": "8px",
  "10": "10px",
  "12": "12px",
  "14": "14px",
  "16": "16px",
  "18": "18px",
  "20": "20px",
  "24": "24px",
  "28": "28px",
  "32": "32px",
  "36": "36px",
  "40": "40px",
  "48": "48px",
  "50": "50px",
  "52": "52px",
  "56": "56px",
  "60": "60px",
  "64": "64px",
  "82": "82px",
  "72": "72px",
  "88": "88px",
  "100": "100px",
  "104": "104px",
  "136": "136px",
  "150": "150px",
  "1/2": "50%",
  auto: "auto",
  unset: "unset",
};

const zIndices = {
  auto: "auto",
  "1": "1",
  "2": "2",
  "3": "3",
  dropdown: "1000",
  sticky: "1020",
  fixed: "1030",
  modalBackdrop: "1040",
  offcanvas: "1050",
  modal: "1060",
  popover: "1070",
  tooltip: "1080",
  modalOverTooltip: "1090",
};

export const vars = createGlobalTheme(":root", {
  color: {
    ...themeVars.colors,
    fallbackGradient: "linear-gradient(270deg, #D1D5DB 0%, #F6F6F6 100%)",
    loadingBackground: "#24272e",
    cardDropShadow: "rgba(0, 0, 0, 10%) 0px 4px 12px",
    green: "#209853",
    orange: "#FA2C38",
    black: "black",
    whitesmoke: "#F5F5F5",
    gray: "#CBCEDC",
    transculent: "#7F7F7F",
    transparent: "transparent",
    none: "none",
    white: "#FFF",

    // new uniswap colors:
    blue400: "#4C82FB",
    blue200: "#ADBCFF30",
    pink400: "#FB118E",
    red700: "#530f10",
    red400: "#FA2C38",
    red300: "#FD766B",
    gold200: "#EEB317",
    gold400: "#B17900",
    green200: "#5CFE9D",
    green300: "#40B66B",
    green400: "#1A9550",
    violet200: "#BDB8FA",
    violet400: "#7A7BEB",
    gray50: "#F5F6FC",
    gray100: "#E8ECFB",
    gray150: "#D2D9EE",
    gray200: "#B8C0DC",
    gray250: "#A6AFCA",
    gray300: "#98A1C0",
    gray350: "#888FAB",
    gray400: "#7780A0",
    gray450: "#6B7594",
    gray500: "#5D6785",
    gray550: "#505A78",
    gray600: "#404A67",
    gray650: "#333D59",
    gray700: "#293249",
    gray750: "#1B2236",
    gray800: "#131A2A",
    gray850: "#0E1524",
    gray900: "#0D111C",
    gray950: "#080B11",
    accentTextLightTertiary: "rgba(255, 255, 255, 0.12)",
    outline: "rgba(153, 161, 189, 0.24)",
    lightGrayOverlay: "#99A1BD14",
    accentActiveSoft: "#311C31",
    accentActive: "#236EFF",
    //NEW COLORS FOR SPORE - need to define light/dark here cause they are root colors now (different system)
    neutral1_dark: "#FFFFFF",
    neutral2_dark: "#9B9B9B",
    neutral3_dark: "#5E5E5E",
    surface1_dark: "#131313",
    surface2_dark: "#1B1B1B",
    surface3_dark: "#FFFFFF1f",
    surface4_dark: "#FFFFFF33",
    surface5_dark: "#00000004",
    accent1_dark: "#236EFF",
    accent2_dark: "#311C31",
    neutral1_light: "#222222",
    neutral2_light: "#7D7D7D",
    neutral3_light: "#CECECE",
    surface1_light: "#FFFFFF",
    surface2_light: "#F9F9F9",
    surface3_light: "#2222220d",
    surface4_light: "#ffffffa3",
    surface5_light: "#0000000a",
    accent1_light: "#236EFF",
    accent2_light: "#FFEFFF",
    success: "#40B66B",
    critical: "#FF5F52",
  },
  border: {
    transculent: "1.5px solid rgba(0, 0, 0, 0.1)",
    none: "none",
  },
  radii: {
    menu: "16px",
    modal: "24px",
    "0": "0px",
    "4": "4px",
    "8": "8px",
    "10": "10px",
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "20": "20px",
    "30": "30px",
    "40": "40px",
    "100": "100px",
    round: "9999px",
  },
  fontSize: {
    "0": "0",
    "10": "10px",
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "20": "20px",
    "24": "24px",
    "28": "28px",
    "34": "34px",
    "36": "36px",
    "40": "40px",
    "48": "48px",
    "60": "60px",
    "96": "96px",
  },
  lineHeight: {
    auto: "auto",
    "1": "1px",
    "12": "12px",
    "14": "14px",
    "16": "16px",
    "20": "20px",
    "24": "24px",
    "28": "28px",
    "36": "36px",
    "44": "44px",
  },
  fontWeight: {
    book: "485",
    medium: "535",
  },
  time: {
    "125": "125ms",
    "250": "250ms",
    "500": "500ms",
  },
  fonts: {
    body: "Inter, sans-serif",
    heading: "Adieu, sans-serif",
  },
});

const flexAlignment = [
  "flex-start",
  "center",
  "flex-end",
  "stretch",
  "baseline",
  "space-around",
  "space-between",
] as const;

const overflow = ["hidden", "inherit", "scroll", "visible", "auto"] as const;

const borderWidth = ["0px", "0.5px", "1px", "1.5px", "2px", "3px", "4px"];

const borderStyle = ["none", "solid"] as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920,
};

const layoutStyles = defineProperties({
  conditions: {
    sm: {},
    md: { "@media": `screen and (min-width: ${breakpoints.sm}px)` },
    lg: { "@media": `screen and (min-width: ${breakpoints.md}px)` },
    xl: { "@media": `screen and (min-width: ${breakpoints.lg}px)` },
    xxl: { "@media": `screen and (min-width: ${breakpoints.xl}px)` },
    xxxl: { "@media": `screen and (min-width: ${breakpoints.xxl}px)` },
  },
  defaultCondition: "sm",
  properties: {
    alignItems: flexAlignment,
    alignSelf: flexAlignment,
    justifyItems: flexAlignment,
    justifySelf: flexAlignment,
    placeItems: flexAlignment,
    placeContent: flexAlignment,
    fontSize: vars.fontSize,
    fontWeight: vars.fontWeight,
    lineHeight: vars.lineHeight,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    marginTop: spacing,
    width: dimensions,
    height: dimensions,
    maxWidth: dimensions,
    minWidth: dimensions,
    maxHeight: dimensions,
    minHeight: dimensions,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingTop: spacing,
    padding: spacing,
    bottom: spacing,
    left: spacing,
    right: spacing,
    top: spacing,
    margin: spacing,
    zIndex: zIndices,
    gap: spacing,
    flexShrink: spacing,
    flex: ["1", "1.5", "2", "3"],
    flexWrap: ["nowrap", "wrap", "wrap-reverse"],
    display: [
      "none",
      "block",
      "flex",
      "inline-flex",
      "inline-block",
      "grid",
      "inline",
    ],
    whiteSpace: ["nowrap"],
    textOverflow: ["ellipsis"],
    textAlign: ["left", "right", "center", "justify"],
    visibility: ["visible", "hidden"],
    flexDirection: ["row", "column", "column-reverse"],
    justifyContent: flexAlignment,
    position: ["absolute", "fixed", "relative", "sticky", "static"],
    objectFit: ["contain", "cover"],
    order: [0, 1],
    opacity: ["auto", "0", "0.1", "0.3", "0.5", "0.7", "1"],
  } as const,
  shorthands: {
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
  },
});

const colorStyles = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
    focus: { selector: "&:focus" },
    before: { selector: "&:before" },
    placeholder: { selector: "&::placeholder" },
  },
  defaultCondition: "default",
  properties: {
    color: vars.color,
    background: vars.color,
    borderColor: vars.color,
    borderLeftColor: vars.color,
    borderBottomColor: vars.color,
    borderTopColor: vars.color,
    backgroundColor: vars.color,
    outlineColor: vars.color,
    fill: vars.color,
  },
});

const unresponsiveProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: "&:hover" },
    active: { selector: "&:active" },
    before: { selector: "&:before" },
  },
  defaultCondition: "default",
  properties: {
    cursor: ["default", "pointer", "auto"],
    borderStyle,
    borderLeftStyle: borderStyle,
    borderBottomStyle: borderStyle,
    borderTopStyle: borderStyle,
    borderRadius: vars.radii,
    borderTopLeftRadius: vars.radii,
    borderTopRightRadius: vars.radii,
    borderBottomLeftRadius: vars.radii,
    borderBottomRightRadius: vars.radii,
    border: vars.border,
    borderBottom: vars.border,
    borderTop: vars.border,
    borderWidth,
    borderBottomWidth: borderWidth,
    borderTopWidth: borderWidth,
    fontFamily: vars.fonts,
    overflow,
    overflowX: overflow,
    overflowY: overflow,
    boxShadow: {
      ...themeVars.shadows,
      none: "none",
      dropShadow: vars.color.dropShadow,
    },
    transition: vars.time,
    transitionDuration: vars.time,
    animationDuration: vars.time,
  },
});

export const sprinkles = createSprinkles(
  layoutStyles,
  colorStyles,
  unresponsiveProperties,
);
export type Sprinkles = Parameters<typeof sprinkles>[0];
