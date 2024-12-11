import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import jestPlugin from "eslint-plugin-jest";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["src/**/*.ts"],
    ignores: ["dist/**", "coverage/**", "node_modules/**"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      jest: jestPlugin,
    },
    rules: {
      "no-console": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { 
        "varsIgnorePattern": "^[A-Z_]+$",
        "argsIgnorePattern": "^_"
      }]
    }
  },
  {
    files: ["src/**/__tests__/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "no-unused-vars": "off"
    },
  }
];
