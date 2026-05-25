import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        graferma: {
          green: "#1F5C3A",
          hover: "#256B45",
          active: "#123626",
          deep: "#174832",
          cream: "#F7F1E7",
          surface: "#FFFDF8",
          border: "#E5D8C7",
          borderStrong: "#D8C8B8",
          text: "#1F1F1F",
          muted: "#6F6A63",
          success: "#138A5B",
          successSoft: "#E7F6EF",
          warning: "#B7791F",
          warningSoft: "#FFF7E6",
          error: "#B42318",
          errorSoft: "#FEE4E2",
          info: "#2563EB",
          infoSoft: "#EFF6FF",
          wood: "#B78B5C"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 24px 80px rgba(31,31,31,0.12)",
        green: "0 16px 32px rgba(31,92,58,0.28)",
      },
    },
  },
  plugins: [],
};

export default config;
