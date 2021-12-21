// It is better to use singular forms for keys.
// In `bind` mode keys are used to set fallbacks
// so `color` is better than `colors` as a prop.
// cf. https://www.npmjs.com/package/styled-props

import { rgba } from "polished";

export const pixelToRem = size => `${size / 16}rem`;

const alpha = {
  none: 0,
  four: 0.04,
  eight: 0.08,
  twelve: 0.12,
  twentyFour: 0.24,
  forty: 0.4,
  full: 1,
};
const color = {
  green: "#45C295",
  white: "#ffffff",
  red: "#E96B6B",
  yellow: "#F5AF26",
  black: "#2D3330",
  black40: "#ABADAC",
  black12: "#E6E7E6",

  kakao: "#F7E317",
  kakaoDark: "#3C1E1E",
  bg: "#f4f5f6",
  background: "#f6f6f6",
  font: "#343434",
};

const colorSet = {
  primary: {
    color: color.white,
    background: color.green,
    borderColor: color.green,
    span: {
      color: color.white,
    },
  },
  secondary: {
    color: color.white,
    background: color.black,
    borderColor: color.black,
    span: {
      color: color.white,
    },
  },
  third: {
    color: color.black,
    background: color.white,
    borderColor: rgba(color.black, alpha.twentyFour),
    span: {
      color: color.black,
    },
  },
  disabled: {
    color: rgba(color.black, alpha.forty),
    background: rgba(color.black, alpha.twelve),
    borderColor: rgba(color.black, alpha.none),
    span: {
      color: rgba(color.black, alpha.forty),
    },
  },
  naked: {
    color: color.black,
    background: color.white,
    borderColor: rgba(color.black, alpha.none),
    span: {
      color: color.black,
    },
  },
  caution: {
    color: color.red,
    background: color.white,
    borderColor: rgba(color.black, alpha.none),
    span: {
      color: color.red,
    },
  },
  opt: {
    color: color.bg,
    background: color.background,
    borderColor: rgba(color.black, alpha.twentyFour),
    span: {
      color: color.bg,
    },
  },
  option: {
    color: color.black40,
    background: "transparent",
    borderColor: "transparent",
    span: {
      color: color.black40,
    },
  },
  sm: {
    color: color.green,
    background: rgba(color.green, alpha.twelve),
    borderColor: rgba(color.black, alpha.none),
    span: {
      color: color.green,
    },
  },
  kakao: {
    color: color.kakaoDark,
    background: color.kakao,
    borderColor: color.kakao,
    span: {
      color: color.kakaoDark,
    },
  },
};

const backgroundSet = {
  primary: color.green,
  secondary: color.black,
  background: color.bg,
  white: color.white,
  readOnly: rgba(color.black, alpha.eight),
  active: rgba(color.green, alpha.twelve),
  third: color.white,
  option: color.bg,
  disabled: rgba(color.black, alpha.twelve),
  naked: color.white,
  caution: color.white,
  opt: color.bg,
  sm: rgba(color.green, alpha.twelve),
  kakao: color.kakao,
};

const borderColorSet = {
  primary: color.green,
  secondary: color.black,
  third: rgba(color.black, alpha.twentyFour),
  option: rgba(color.black, alpha.twentyFour),
  disabled: rgba(color.black, alpha.none),
  naked: rgba(color.black, alpha.none),
  caution: rgba(color.black, alpha.none),
  sm: rgba(color.black, alpha.none),
  kakao: color.kakao,
};

const font = {
  h1: {
    fontSize: pixelToRem(24),
    fontWeight: "700",
    lineHeight: 1.4,
  },
  h2: {
    fontSize: pixelToRem(20),
    fontWeight: "700",
    lineHeight: 1.4,
  },
  h3: {
    fontSize: pixelToRem(16),
    fontWeight: "700",
  },
  h4: {
    fontSize: pixelToRem(12),
    fontWeight: "700",
  },
  body1: {
    fontSize: pixelToRem(16),
    fontWeight: "400",
  },
  body2: {
    fontSize: pixelToRem(14),
    fontWeight: "400",
  },
  caption: {
    fontSize: pixelToRem(14),
    fontWeight: "400",
    color: color.black40,
  },
  button: {
    fontSize: pixelToRem(16),
    fontWeight: "400",
    // fontStyle: 'italic',
  },
};

export const theme = {
  alpha,
  color,
  colorSet,
  backgroundSet,
  borderColorSet,
  font,
};
