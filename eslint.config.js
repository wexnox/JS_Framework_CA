import {
    defineConfig,
    globalIgnores,
} from "eslint/config";

import globals from "globals";

import {
    fixupConfigRules,
} from "@eslint/compat";

import reactRefresh from "eslint-plugin-react-refresh";
import js from "@eslint/js";

import {
    FlatCompat,
} from "@eslint/eslintrc";

import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default defineConfig([{
    files: ["**/*.{js,jsx}"],
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },

        ecmaVersion: "latest",
        sourceType: "module",
        parserOptions: {},
    },

    extends: fixupConfigRules(compat.extends(
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    )),

    settings: {
        react: {
            version: "detect",
        },
    },

    plugins: {
        "react-refresh": reactRefresh,
    },

    rules: {
        "react/prop-types": "off",
        "no-unused-vars": ["warn", { "varsIgnorePattern": "^React$" }],
        "react/no-unescaped-entities": "off",
        "react-hooks/set-state-in-effect": "off",
        "react/react-in-jsx-scope": "off",
    },
}, globalIgnores(["**/dist"])]);
