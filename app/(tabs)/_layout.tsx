import { Redirect, Tabs } from "expo-router";
import { View } from "react-native";

import { ProfileButton } from "@/components/auth";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useColorScheme } from "@/hooks/useColorScheme";
import { NAV_THEME } from "@/lib/constants/colors";
import { useAuth } from "@/lib/contexts/AuthContext";
import { HomeIcon, DatabaseIcon, UserIcon, ZapIcon } from "@/lib/icons";

export default function TabsLayout() {
    const { isDarkColorScheme } = useColorScheme();
    const colors = isDarkColorScheme ? NAV_THEME.dark : NAV_THEME.light;
    const { isAuthenticated, isLoading } = useAuth();

    // If the user is not authenticated, redirect to the sign-in page
    if (!isLoading && !isAuthenticated) {
        return <Redirect href="/(auth)/sign-in" />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                headerTitleAlign: "center",
                headerRight: () => (
                    <View className="flex-row items-center gap-3 pr-4">
                        <ThemeToggle />
                        <ProfileButton />
                    </View>
                ),
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
                    tabBarIcon: () => <DatabaseIcon className="text-foreground" />,
                }}
            />
            <Tabs.Screen
                name="legend-state"
                options={{
                    title: "Legend State",
                    tabBarIcon: () => <ZapIcon className="text-foreground" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: () => <UserIcon className="text-foreground" />,
                }}
            />
        </Tabs>
    );
}
