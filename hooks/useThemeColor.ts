/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { useColorScheme } from "@/hooks/useColorScheme";
import { NAV_THEME } from "@/lib/constants/colors";

export function useThemeColor(
    props: { light?: string; dark?: string },
    colorName: keyof typeof NAV_THEME.light & keyof typeof NAV_THEME.dark
) {
    const { isDarkColorScheme } = useColorScheme();
    const theme = isDarkColorScheme ? "dark" : "light";
    const colorFromProps = props[theme];

    if (colorFromProps) {
        return colorFromProps;
    } else {
        return NAV_THEME[theme][colorName];
    }
}
