import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

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

/**
 * Detect system color scheme for web
 */
function detectSystemColorScheme(): "light" | "dark" {
    // Check if window.matchMedia is available
    if (typeof window !== "undefined" && window.matchMedia) {
        // Check if the user prefers dark mode
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
    }
    // Default to light if we can't detect
    return "light";
}

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
    const [hasHydrated, setHasHydrated] = useState(false);
    const nativewindTheme = useNativewindColorScheme();
    const { theme, setTheme } = useThemeStore();
    const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

    // Handle hydration and system theme detection
    useEffect(() => {
        setHasHydrated(true);
        setSystemTheme(detectSystemColorScheme());

        // Set up listener for system theme changes
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const updateSystemTheme = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? "dark" : "light");
        };

        // Add event listener for theme changes
        if (darkModeMediaQuery.addEventListener) {
            darkModeMediaQuery.addEventListener("change", updateSystemTheme);
        } else if (darkModeMediaQuery.addListener) {
            // Fallback for older browsers
            darkModeMediaQuery.addListener(updateSystemTheme);
        }

        // Cleanup
        return () => {
            if (darkModeMediaQuery.removeEventListener) {
                darkModeMediaQuery.removeEventListener("change", updateSystemTheme);
            } else if (darkModeMediaQuery.removeListener) {
                darkModeMediaQuery.removeListener(updateSystemTheme);
            }
        };
    }, []);

    // Determine the effective theme (actual theme to apply)
    const effectiveTheme = theme === "system" ? systemTheme : theme;
    const isDarkColorScheme = effectiveTheme === "dark";

    // Sync NativeWind theme with our effective theme
    useEffect(() => {
        if (hasHydrated) {
            nativewindTheme.setColorScheme(isDarkColorScheme ? "dark" : "light");
        }
    }, [isDarkColorScheme, nativewindTheme, hasHydrated]);

    // Apply the appropriate class to the root element
    useEffect(() => {
        if (!hasHydrated) return;
        
        try {
            const root = document.documentElement;
            if (root) {
                if (isDarkColorScheme) {
                    root.classList.add("dark");
                } else {
                    root.classList.remove("dark");
                }
            }
        } catch (_error) {
            // Ignore errors
        }
    }, [isDarkColorScheme, hasHydrated]);

    const setColorScheme = (newTheme: Theme) => {
        // Just set the theme once
        setTheme(newTheme);
    };

    if (!hasHydrated) {
        return {
            colorScheme: "system",
            effectiveColorScheme: "light",
            isDarkColorScheme: false,
            setColorScheme,
        };
    }

    return {
        colorScheme: theme,
        effectiveColorScheme: effectiveTheme,
        isDarkColorScheme,
        setColorScheme,
    };
}
