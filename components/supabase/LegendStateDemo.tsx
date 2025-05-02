import { observer } from "@legendapp/state/react";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/lib/contexts/AuthContext";
import { userSettings$ } from "@/lib/services/legend-state";

// Create a settings component using Legend State
const LegendStateDemo = observer(function LegendStateDemo() {
    const [newSetting, setNewSetting] = useState("");
    const settings = userSettings$.get();
    const { user } = useAuth();

    // Add a new setting to the observable
    const addSetting = () => {
        if (!newSetting.trim() || !user) return;

        const id = uuidv4();
        userSettings$[id].set({
            id,
            user_id: user.id,
            name: newSetting,
            value: "default",
            created_at: null,
            updated_at: null,
            deleted: false,
        });

        setNewSetting("");
    };

    // Toggle a setting value
    const toggleValue = (id: string) => {
        const currentValue = userSettings$[id].value.get();
        userSettings$[id].value.set(currentValue === "default" ? "modified" : "default");
    };

    // Delete a setting (soft delete)
    const deleteSetting = (id: string) => {
        userSettings$[id].deleted.set(true);
    };

    // Show a message if user is not logged in
    if (!user) {
        return (
            <View className="p-4">
                <Text className="text-center">Please sign in to manage settings</Text>
            </View>
        );
    }

    return (
        <View className="space-y-4 p-4">
            <Text className="text-xl font-bold">Legend State Demo</Text>

            <View className="flex-row space-x-2">
                <TextInput
                    className="flex-1 rounded-md bg-gray-100 p-2 dark:bg-gray-800"
                    value={newSetting}
                    onChangeText={setNewSetting}
                    placeholder="Enter setting name"
                />
                <Button onPress={addSetting}>Add</Button>
            </View>

            <View className="space-y-2">
                <Text className="font-bold">User Settings</Text>
                {settings &&
                    Object.values(settings)
                        .filter(setting => setting && !setting.deleted && setting.user_id === user.id)
                        .map(setting => (
                            <View
                                key={setting.id}
                                className="flex-row items-center justify-between rounded-md bg-gray-50 p-3 dark:bg-gray-900">
                                <View>
                                    <Text className="font-medium">{setting.name}</Text>
                                    {/* Using regular Text instead of Reactive.Text */}
                                    <Text style={{ color: setting.value === "default" ? "#666" : "#0077FF" }}>
                                        {setting.value}
                                    </Text>
                                </View>
                                <View className="flex-row space-x-2">
                                    <Button variant="outline" onPress={() => toggleValue(setting.id)}>
                                        Toggle
                                    </Button>
                                    <Button variant="destructive" onPress={() => deleteSetting(setting.id)}>
                                        Delete
                                    </Button>
                                </View>
                            </View>
                        ))}
                {settings &&
                    !Object.values(settings).some(
                        (setting: any) => setting && !setting.deleted && setting.user_id === user.id
                    ) && <Text className="italic text-gray-500">No settings found. Add one to see it here.</Text>}
            </View>

            <Text className="mt-4 text-sm text-gray-500">
                All changes are automatically persisted locally and synced with Supabase when online.
            </Text>
        </View>
    );
});

export default LegendStateDemo;
