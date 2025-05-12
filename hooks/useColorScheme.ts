import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Platform, useColorScheme as useRNColorScheme } from "react-native";
import React, { useEffect } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            theme: "system",
            setTheme: (theme) => set({ theme }),
        }),
        {
            name: "theme-storage",
        }
    )
);

export function useColorScheme() {
    // Get the native system color scheme
    const nativeSystemTheme = useRNColorScheme();
    // Get NativeWind's color scheme
    const nativewindTheme = useNativewindColorScheme();
    // Get our persisted theme
    const { theme, setTheme } = useThemeStore();

    // Determine the actual system preference (from React Native)
    const actualSystemTheme = nativeSystemTheme || "light";
    
    // Determine the effective theme (actual theme to apply)
    const effectiveTheme = theme === "system" ? actualSystemTheme : theme;
    const isDarkColorScheme = effectiveTheme === "dark";

    // Sync NativeWind theme with our effective theme
    useEffect(() => {
        nativewindTheme.setColorScheme(isDarkColorScheme ? "dark" : "light");
    }, [isDarkColorScheme, nativewindTheme]);

    // Apply the appropriate class to the root element
    useEffect(() => {
        if (Platform.OS === "web") {
            try {
                const root = globalThis.document?.documentElement;
                if (root) {
                    if (isDarkColorScheme) {
                        root.classList.add("dark");
                    } else {
                        root.classList.remove("dark");
                    }
                }
            } catch (_error) {
                // Ignore errors in non-web environments
            }
        }
    }, [isDarkColorScheme]);

    return {
        colorScheme: theme,
        effectiveColorScheme: effectiveTheme,
        isDarkColorScheme,
        setColorScheme: (newTheme: Theme) => {
            // Just set the theme once
            setTheme(newTheme);
        },
    };
}
