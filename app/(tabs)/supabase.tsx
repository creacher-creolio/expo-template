import React from "react";
import { View } from "react-native";

import { ConnectionTest } from "@/components/supabase/ConnectionTest";
import { Text } from "@/components/ui/text";

export default function SupabaseTab() {
    return (
        <View className="flex-1 bg-white p-4 dark:bg-black">
            <Text className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">Supabase Integration</Text>

            <Text className="mb-6 text-gray-700 dark:text-gray-300">
                This project uses Supabase for backend services including authentication, database, and real-time data
                synchronization.
            </Text>

            <ConnectionTest />
        </View>
    );
}
