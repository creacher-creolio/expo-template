import { Stack } from "expo-router";
import * as React from "react";
import { ScrollView, View } from "react-native";

import LegendStateDemo from "@/components/supabase/LegendStateDemo";
import { Text } from "@/components/ui/text";

export default function LegendStatePage() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Legend State",
                    headerShown: true,
                }}
            />
            <ScrollView className="flex-1">
                <View className="py-4">
                    <View className="px-4 pb-4">
                        <Text className="text-lg">
                            This page demonstrates using Legend State with Supabase for reactive state management with
                            local persistence and automatic syncing.
                        </Text>
                    </View>
                    <LegendStateDemo />
                </View>
            </ScrollView>
        </>
    );
}
