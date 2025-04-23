import { useColorScheme as useNativewindColorScheme } from "nativewind";
import { useEffect, useState } from "react";

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
    const [hasHydrated, setHasHydrated] = useState(false);
    const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();

    useEffect(() => {
        setHasHydrated(true);
    }, []);

    if (!hasHydrated) {
        return {
            colorScheme: "light",
            isDarkColorScheme: false,
            setColorScheme,
            toggleColorScheme,
        };
    }

    return {
        colorScheme: colorScheme ?? "dark",
        isDarkColorScheme: colorScheme === "dark",
        setColorScheme,
        toggleColorScheme,
    };
}
