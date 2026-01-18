// postcss.config.mjs
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ use the new plugin
    autoprefixer: {},
  },
};
