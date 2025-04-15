// https://docs.expo.dev/guides/using-eslint/
module.exports = {
    env: {
        es2021: true,
        node: true,
    },
    extends: ["expo", "eslint:recommended", "prettier"],
    plugins: ["expo", "import", "prettier"],
    ignorePatterns: [
        ".expo/",
        ".prettierrc.js",
        "**/*.config.js",
        "**/*.config.ts",
        "app-example/",
        "build/",
        "dist/",
        "node_modules/",
        "package-lock.json",
    ],
    rules: {
        // Import ordering
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

        // Length and complexity limits
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

        // Prettier integration
        "prettier/prettier": [
            "warn",
            {
                endOfLine: "auto",
            },
        ],
    },
    overrides: [
        {
            files: ["components/ui/**/*.{js,ts,jsx,tsx}", "lib.{js,ts,jsx,tsx}"],
            rules: {
                "max-len": "off",
                "max-lines": "off",
            },
        },
    ],
};
