import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import * as React from "react";
import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{ title: "Oops!" }} />
            <View className="flex-1 items-center justify-center bg-background p-6">
                <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
                    <FontAwesome name="exclamation-triangle" size={32} color="#ef4444" />
                </View>

                <Text className="mb-2 text-center text-2xl font-bold">Page Not Found</Text>

                <Text className="mb-8 text-center text-base text-foreground/70">This screen doesn't exist.</Text>

                <Link href="../(tabs)" asChild>
                    <Button variant="default" className="rounded-lg px-6 py-3">
                        <Text className="font-medium text-primary-foreground">Go to Home Screen</Text>
                    </Button>
                </Link>
            </View>
        </>
    );
}
