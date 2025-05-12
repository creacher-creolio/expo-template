import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { Platform } from "react-native";
import "react-native-reanimated";

import "@/global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { NAV_THEME } from "@/lib/constants/colors";
import { AuthProvider } from "@/lib/contexts/AuthContext";

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
    const hasMounted = React.useRef(false);
    const { isDarkColorScheme, effectiveColorScheme } = useColorScheme();
    const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

    useIsomorphicLayoutEffect(() => {
        if (hasMounted.current) {
            return;
        }
        // Set Android navigation bar color based on the effective theme
        setAndroidNavigationBar(effectiveColorScheme as "light" | "dark");
        setIsColorSchemeLoaded(true);
        hasMounted.current = true;
    }, [effectiveColorScheme]);

    // For debugging
    React.useEffect(() => {
        console.log("RootLayout:", { isDarkColorScheme, effectiveColorScheme });
    }, [isDarkColorScheme, effectiveColorScheme]);

    if (!isColorSchemeLoaded) {
        return null;
    }
    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
            <AuthProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: "none" }} />
                    <Stack.Screen name="(auth)" options={{ headerShown: false, animation: "none" }} />
                </Stack>
                <PortalHost />
            </AuthProvider>
        </ThemeProvider>
    );
}

const useIsomorphicLayoutEffect =
    Platform.OS === "web" && typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;
