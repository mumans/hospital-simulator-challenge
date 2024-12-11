import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{js,ts,vue}"],
      exclude: ["node_modules/", "src/**/*.spec.ts"],
    },
  },
});
