import React from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

export default function HomeScreen() {
    return (
        <View className="flex-1 items-center justify-center p-6">
            <Text className="mb-3 text-2xl font-bold">Welcome</Text>
            <Text className="text-center text-base text-foreground/70">
                Explore the app
            </Text>
        </View>
    );
}
