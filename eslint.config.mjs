import { defineConfig, globalIgnores } from "eslint/config";
import expo from "eslint-plugin-expo";
import _import from "eslint-plugin-import";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores([
        "**/.expo/",
        "**/.prettierrc.js",
        "**/*.config.js",
        "**/*.config.ts",
        "**/app-example/",
        "**/build/",
        "**/dist/",
        "**/node_modules/",
        "**/package-lock.json",
    ]),
    {
        extends: compat.extends("expo", "eslint:recommended", "prettier", "plugin:react-native-a11y/all"),

        plugins: {
            expo,
            import: _import,
            prettier,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },
        },

        rules: {
            "import/order": [
                "warn",
                {
                    groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],

                    pathGroups: [
                        {
                            pattern: "react",
                            group: "builtin",
                            position: "before",
                        },
                        {
                            pattern: "react-native",
                            group: "builtin",
                            position: "before",
                        },
                        {
                            pattern: "expo/**",
                            group: "external",
                            position: "before",
                        },
                        {
                            pattern: "~/**",
                            group: "internal",
                            position: "after",
                        },
                        {
                            pattern: "@/**",
                            group: "internal",
                            position: "after",
                        },
                    ],

                    "newlines-between": "always",

                    alphabetize: {
                        order: "asc",
                        caseInsensitive: true,
                    },

                    warnOnUnassignedImports: true,
                },
            ],

            "max-len": [
                "warn",
                {
                    code: 120,
                    ignoreComments: false,
                    ignoreRegExpLiterals: false,
                    ignoreStrings: false,
                    ignoreTemplateLiterals: false,
                    ignoreUrls: true,
                    ignorePattern: "^\\s*[\"'].*[\"'],?$|^.*(class=|className=|cn\\().*$",
                },
            ],

            "max-lines": [
                "warn",
                {
                    max: 250,
                    skipBlankLines: false,
                    skipComments: false,
                },
            ],

            "prettier/prettier": [
                "warn",
                {
                    endOfLine: "auto",
                },
            ],
        },
    },
    {
        files: ["components/ui/**/*.{js,ts,jsx,tsx}"],

        rules: {
            "max-len": "off",
            "max-lines": "off",
            "react-hooks/exhaustive-deps": "off",
        },
    },
    {
        files: ["**/types/**/*.{js,ts,jsx,tsx}"],

        rules: {
            "no-unused-vars": "off",
            "no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
        },
    },
]);
