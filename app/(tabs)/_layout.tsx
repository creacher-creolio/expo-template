import { Tabs } from "expo-router";

import { ThemeToggle } from "@/components/ThemeToggle";
import { NAV_THEME } from "@/constants/colors";
import { HomeIcon, DatabaseIcon } from "@/lib/icons";
import { useColorScheme } from "@/lib/useColorScheme";

export default function TabsLayout() {
    const { isDarkColorScheme } = useColorScheme();
    const colors = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                headerRight: () => <ThemeToggle />,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: () => <HomeIcon className="text-foreground" />,
                }}
            />
            <Tabs.Screen
                name="supabase"
                options={{
                    title: "Supabase",
                    tabBarIcon: ({ color }) => <DatabaseIcon className="text-foreground" />,
                }}
            />
        </Tabs>
    );
}
