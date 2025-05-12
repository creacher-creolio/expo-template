import { View, Text } from "react-native";
import * as React from "react";
import { Svg, Circle, Defs, LinearGradient, Stop } from "react-native-svg";
import { useColorScheme as useNativewindColorScheme } from "nativewind";

import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { MoonStarIcon, SunIcon } from "~/lib/icons";
import { cn } from "~/lib/utils";

import { useColorScheme, Theme } from "@/hooks/useColorScheme";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// System theme icon for React Native
const SystemThemeIcon = ({ size = 23, className }: { size?: number; className?: string }) => (
    <Svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}>
        <Defs>
            <LinearGradient id="splitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <Stop offset="48%" stopColor="white" />
                <Stop offset="52%" stopColor="black" />
            </LinearGradient>
        </Defs>
        <Circle cx="12" cy="12" r="10" fill="url(#splitGradient)" stroke="currentColor" />
    </Svg>
);

export function ThemeToggle({ className }: { className?: string }) {
    const { colorScheme, setColorScheme, effectiveColorScheme } = useColorScheme();
    const [theme, setTheme] = React.useState<Theme>((colorScheme as Theme) || "system");

    // Initialize theme from colorScheme when component mounts or when colorScheme changes
    React.useEffect(() => {
        if (colorScheme === "light" || colorScheme === "dark" || colorScheme === "system") {
            setTheme(colorScheme);
        }
    }, [colorScheme]);

    // Update Android navigation bar when theme changes
    React.useEffect(() => {
        // Use the effective theme for Android navigation bar
        setAndroidNavigationBar(effectiveColorScheme as "light" | "dark");
    }, [effectiveColorScheme]);

    // Update global color scheme when local theme changes
    React.useEffect(() => {
        // Only update if the themes don't match
        if (theme !== colorScheme) {
            setColorScheme(theme);
        }
    }, [theme, colorScheme, setColorScheme]);

    // Function to cycle through themes
    const cycleTheme = () => {
        setTheme(current => {
            if (current === "dark") return "light";
            if (current === "light") return "system";
            return "dark";
        });
    };

    // Get the appropriate icon based on current theme
    const getIcon = () => {
        switch (theme) {
            case "dark":
                return <MoonStarIcon className="text-foreground" size={23} strokeWidth={1.25} />;
            case "light":
                return <SunIcon className="text-foreground" size={24} strokeWidth={1.25} />;
            default:
                return <SystemThemeIcon className="text-foreground" size={23} />;
        }
    };

    // Get tooltip text based on current theme
    const getTooltipText = () => {
        switch (theme) {
            case "dark":
                return "Switch to light mode";
            case "light":
                return "Switch to system mode";
            default:
                return "Switch to dark mode";
        }
    };

    // For debugging
    React.useEffect(() => {
        console.log("ThemeToggle:", { theme, colorScheme, effectiveColorScheme });
    }, [theme, colorScheme, effectiveColorScheme]);

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    onPress={cycleTheme}
                    accessibilityLabel={`Current theme: ${theme}`}
                    accessibilityHint={getTooltipText()}
                    className={cn("h-8 w-8", className)}>
                    {getIcon()}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <View>
                    <View className="px-3 py-2">
                        <Text className="text-sm text-foreground">{getTooltipText()}</Text>
                    </View>
                </View>
            </TooltipContent>
        </Tooltip>
    );
}
