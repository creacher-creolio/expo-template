import { router } from "expo-router";
import * as React from "react";
import { Alert, ScrollView, View } from "react-native";

import { ProtectedRoute } from "@/components/auth";
import { ErrorScreen } from "@/components/common";
import { ProfileHeader, UserInfoCard, AccountSettingsCard, SignOutButton } from "@/components/profile";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function ProfileScreen() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}

function ProfileContent() {
    const { user } = useAuth();
    const [error, setError] = React.useState<string | null>(null);

    const handleSuccess = (message: string) => {
        Alert.alert("Success", message);
    };

    const handleError = (error: Error) => {
        Alert.alert("Error", error.message);
    };

    const handleDeleteSuccess = async () => {
        Alert.alert("Account Deleted", "Your account has been successfully deleted");
        router.replace("/");
    };

    const handleSignOutError = (errorMsg: string) => {
        Alert.alert("Error", errorMsg);
    };

    if (error) {
        return <ErrorScreen errorMessage={error} onRetry={() => setError(null)} />;
    }

    return (
        <ScrollView className="flex-1 bg-background">
            <View className="p-5">
                <ProfileHeader user={user} />
                <UserInfoCard user={user} />
                <AccountSettingsCard
                    user={user}
                    onSuccessMessage={handleSuccess}
                    onError={handleError}
                    onDeleteSuccess={handleDeleteSuccess}
                />
                <SignOutButton onError={handleSignOutError} />
            </View>
        </ScrollView>
    );
}
