import {heroui} from "@heroui/react";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '0px',
      },
    },
  },
  darkMode: "class",
  plugins: [heroui({
    themes: {
      light: {
        layout: {
          radius: {
            small: "0px",
            medium: "0px", 
            large: "0px",
          },
        },
      },
      dark: {
        layout: {
          radius: {
            small: "0px",
            medium: "0px",
            large: "0px", 
          },
        },
      },
    },
  })],
}