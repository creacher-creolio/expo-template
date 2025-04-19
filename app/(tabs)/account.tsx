import * as React from "react";
import { ActivityIndicator, Alert, ScrollView, View } from "react-native";

import { UpdateEmailForm } from "@/components/auth/UpdateEmailForm";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getCurrentUser } from "@/services/auth";

export default function AccountScreen() {
    const [user, setUser] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [activeSection, setActiveSection] = React.useState<"email" | "password" | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        loadUserData();
    }, []);

    const loadUserData = async () => {
        try {
            setIsLoading(true);
            const userData = await getCurrentUser();
            setUser(userData);
            setError(null);
        } catch (err: any) {
            setError(err.message || "Failed to load user data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuccess = (message: string) => {
        Alert.alert("Success", message);
        setActiveSection(null);
    };

    const handleError = (error: Error) => {
        Alert.alert("Error", error.message);
    };

    if (isLoading) {
        return (
            <View className="flex-1 items-center justify-center">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="mb-4 text-lg text-destructive">{error}</Text>
                <Button onPress={loadUserData}>
                    <Text>Retry</Text>
                </Button>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-background">
            <View className="p-5">
                <Text className="mb-6 text-3xl font-bold">Account Settings</Text>

                <View className="mb-6 rounded-lg bg-card p-4">
                    <Text className="mb-3 text-xl font-semibold">User Information</Text>
                    <View className="mb-2">
                        <Text className="text-muted-foreground">Email</Text>
                        <Text className="font-medium">{user?.email}</Text>
                    </View>
                    <View className="mb-2">
                        <Text className="text-muted-foreground">User ID</Text>
                        <Text className="font-medium">{user?.id}</Text>
                    </View>
                    <View>
                        <Text className="text-muted-foreground">Last Sign In</Text>
                        <Text className="font-medium">
                            {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "N/A"}
                        </Text>
                    </View>
                </View>

                <View className="mb-4 rounded-lg bg-card p-4">
                    <Text className="mb-3 text-xl font-semibold">Email Address</Text>
                    {activeSection === "email" ? (
                        <UpdateEmailForm
                            currentEmail={user?.email || ""}
                            onSuccess={() => handleSuccess("Email update has been initiated. Check your inbox.")}
                            onError={handleError}
                        />
                    ) : (
                        <Button variant="outline" className="mt-2" onPress={() => setActiveSection("email")}>
                            <Text>Change Email</Text>
                        </Button>
                    )}
                </View>

                <View className="mb-4 rounded-lg bg-card p-4">
                    <Text className="mb-3 text-xl font-semibold">Password</Text>
                    {activeSection === "password" ? (
                        <UpdatePasswordForm
                            onSuccess={() => handleSuccess("Password updated successfully")}
                            onError={handleError}
                        />
                    ) : (
                        <Button variant="outline" className="mt-2" onPress={() => setActiveSection("password")}>
                            <Text>Change Password</Text>
                        </Button>
                    )}
                </View>

                {activeSection && (
                    <Button variant="ghost" onPress={() => setActiveSection(null)} className="mt-4">
                        <Text>Cancel</Text>
                    </Button>
                )}
            </View>
        </ScrollView>
    );
}
