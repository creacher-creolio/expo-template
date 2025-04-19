import { Stack } from "expo-router";
import * as React from "react";
import { View } from "react-native";

export default function AuthLayout() {
    return (
        <View className="flex-1 bg-background">
            <Stack
                screenOptions={{
                    headerShown: true,
                    contentStyle: { backgroundColor: "transparent" },
                    headerTitleAlign: "center",
                }}>
                <Stack.Screen
                    name="sign-in"
                    options={{
                        title: "Sign In",
                    }}
                />
                <Stack.Screen
                    name="sign-up"
                    options={{
                        title: "Sign Up",
                    }}
                />
            </Stack>
        </View>
    );
}
