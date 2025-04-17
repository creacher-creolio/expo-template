import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSupabase } from "@/hooks/useSupabase";

export const ConnectionTest = () => {
    const { isConnected, error, checkConnection } = useSupabase();
    const [isLoading, setIsLoading] = useState(false);

    const handleTestConnection = async () => {
        setIsLoading(true);
        await checkConnection();
        setIsLoading(false);
    };

    return (
        <View className="my-2 rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
            <Text className="mb-2 text-base font-medium text-gray-900 dark:text-gray-100">
                Supabase Connection Status
            </Text>

            <View className="mb-2 flex-row items-center">
                <View
                    className={`mr-2 h-3 w-3 rounded-full ${
                        isConnected === null ? "bg-gray-400" : isConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                />
                <Text className="text-sm text-gray-700 dark:text-gray-300">
                    {isConnected === null ? "Checking connection..." : isConnected ? "Connected" : "Not connected"}
                </Text>
            </View>

            {error && <Text className="mb-2 text-sm text-red-600 dark:text-red-400">Error: {error}</Text>}

            <Button
                onPress={handleTestConnection}
                disabled={isLoading}
                variant={isLoading ? "secondary" : "default"}
                className="mt-2">
                {isLoading ? <ActivityIndicator size="small" color="#fff" /> : <Text>Test Connection</Text>}
            </Button>
        </View>
    );
};
