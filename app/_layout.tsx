import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import * as React from "react";
import "react-native-reanimated";

import "@/global.css";

export default function RootLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
            <PortalHost />
        </>
    );
}
