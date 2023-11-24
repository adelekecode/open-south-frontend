/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Work-Sans": ["Work Sans", "sans-serif"],
        Marhey: ["Marhey", "sans-serif"],
      },
      maxWidth: {
        maxAppWidth: "1666px",
      },
      boxShadow: {
        appNavBar: "0 1px 3px #00001229",
      },
      colors: {
        primary: {
          50: "#f1f9fe",
          100: "#e2f2fc",
          200: "#bee6f9",
          300: "#85d1f4",
          400: "#44baec",
          500: "#1ca2db",
          600: "#0e82bb",
          700: "#0d6897",
          800: "#0e5376",
          900: "#124968",
          950: "#0c2f45",
        },
        secondary: {
          50: "#effef5",
          100: "#d9ffe7",
          200: "#b5fdd1",
          300: "#7cf9ae",
          400: "#3cec83",
          500: "#13d461",
          600: "#09b04d",
          700: "#0c9444",
          800: "#0f6c36",
          900: "#0e592f",
          950: "#013217",
        },
        info: {
          50: "#f6f6f7",
          100: "#efeff0",
          200: "#e1e1e4",
          300: "#d4d4d8",
          400: "#b9b9c0",
          500: "#a7a6ae",
          600: "#94919a",
          700: "#7f7d85",
          800: "#68676c",
          900: "#56555a",
          950: "#323234",
        },
      },
      screens: {
        smallMobile: { max: "320px" },
        // => @media (max-width: 320px) { ... }

        mediumMobile: { max: "375px" },
        // => @media (max-width: 375px) { ... }

        largeMobile: { max: "425px" },
        // => @media (max-width: 425px) { ... }

        tablet: { max: "768px" },
        // => @media (max-width: 768px) { ... }

        tabletAndBelow: { max: "1024px" },
        // => @media (max-width:1024px) { ... }

        laptopAndAbove: { min: "1024px" },
        // => @media (min-width:1024px) { ... }

        largeLaptop: { min: "1440px" },
        // => @media (min-width: 1440px) { ... }

        "4kDesktop": { min: "2560px" },
        // => @media (min-width: 2560px) { ... }

        authTablet: { max: "900px" },
        // => @media (max-width: 900px) { ... }

        authDesktop: { min: "901px" },
        // => @media (min-width: 901px) { ... }
      },
    },
  },
  plugins: [],
};
