import { router } from "expo-router";
import * as React from "react";
import { ActivityIndicator, Alert, ScrollView, View, Animated } from "react-native";

import { DeleteAccountForm, ProtectedRoute, UpdateEmailForm, UpdatePasswordForm } from "@/components/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/contexts/AuthContext";
import { UserIcon, MailIcon, LockIcon, LogOutIcon, XIcon } from "@/lib/icons";
import { signOut } from "@/services/auth";

export default function ProfileScreen() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}

function ProfileContent() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState<"email" | "password" | "delete" | null>(null);
    const [error, setError] = React.useState<string | null>(null);

    // Animation value for section expansion
    const animatedHeight = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: activeSection ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [activeSection, animatedHeight]);

    const handleSignOut = async () => {
        try {
            setIsLoading(true);
            await signOut();
            router.replace("/");
        } catch (err: any) {
            Alert.alert("Error", err.message || "Failed to sign out");
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

    const handleDeleteSuccess = async () => {
        Alert.alert("Account Deleted", "Your account has been successfully deleted");
        router.replace("/");
    };

    // Helper to get user initials for avatar fallback
    const getUserInitials = () => {
        if (!user?.email) return "?";
        return user.email.charAt(0).toUpperCase();
    };

    if (error) {
        return (
            <View className="flex-1 items-center justify-center p-4">
                <Text className="mb-4 text-lg text-destructive">{error}</Text>
                <Button onPress={() => setError(null)}>
                    <Text>Retry</Text>
                </Button>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-background">
            <View className="p-5">
                {/* Profile Header with Avatar */}
                <View className="mb-6 flex-row items-center">
                    <Avatar className="mr-4 h-16 w-16" alt={user?.email || "User avatar"}>
                        <AvatarImage source={{ uri: user?.user_metadata?.avatar_url }} />
                        <AvatarFallback>
                            <Text className="text-xl font-semibold">{getUserInitials()}</Text>
                        </AvatarFallback>
                    </Avatar>
                    <View>
                        <Text className="text-3xl font-bold">Profile</Text>
                        <Text className="text-muted-foreground">{user?.email}</Text>
                    </View>
                </View>

                {/* User Information Card */}
                <Card className="mb-6">
                    <CardHeader className="flex-row items-center">
                        <UserIcon className="mr-2 h-5 w-5 text-primary" />
                        <CardTitle>User Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <View className="mb-3 flex-row items-center justify-between">
                            <Text className="text-muted-foreground">Email</Text>
                            <Text className="font-medium">{user?.email}</Text>
                        </View>
                        <View className="mb-3 flex-row items-center justify-between">
                            <Text className="text-muted-foreground">User ID</Text>
                            <Text className="text-xs font-medium">{user?.id}</Text>
                        </View>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-muted-foreground">Last Sign In</Text>
                            <Text className="font-medium">
                                {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "N/A"}
                            </Text>
                        </View>
                    </CardContent>
                </Card>

                {/* Account Settings Card */}
                <Card className="mb-6">
                    <CardHeader className="flex-row items-center">
                        <UserIcon className="mr-2 h-5 w-5 text-primary" />
                        <CardTitle>Account Settings</CardTitle>
                        {activeSection && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onPress={() => setActiveSection(null)}
                                className="ml-auto">
                                <XIcon className="h-5 w-5" />
                            </Button>
                        )}
                    </CardHeader>
                    <CardContent>
                        {activeSection ? (
                            <Animated.View style={{ opacity: animatedHeight }}>
                                {activeSection === "email" && (
                                    <UpdateEmailForm
                                        currentEmail={user?.email || ""}
                                        onSuccess={() =>
                                            handleSuccess("Email update has been initiated. Check your inbox.")
                                        }
                                        onError={handleError}
                                    />
                                )}
                                {activeSection === "password" && (
                                    <UpdatePasswordForm
                                        onSuccess={() => handleSuccess("Password updated successfully")}
                                        onError={handleError}
                                    />
                                )}
                                {activeSection === "delete" && (
                                    <DeleteAccountForm
                                        email={user?.email || ""}
                                        onSuccess={handleDeleteSuccess}
                                        onError={handleError}
                                        onCancel={() => setActiveSection(null)}
                                    />
                                )}
                            </Animated.View>
                        ) : (
                            <View className="flex flex-col gap-3">
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <MailIcon className="mr-2 h-5 w-5 text-primary" />
                                        <Text className="font-medium">Change Email</Text>
                                    </View>
                                    <Button variant="outline" size="sm" onPress={() => setActiveSection("email")}>
                                        <Text>Edit</Text>
                                    </Button>
                                </View>

                                <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <LockIcon className="mr-2 h-5 w-5 text-primary" />
                                        <Text className="font-medium">Change Password</Text>
                                    </View>
                                    <Button variant="outline" size="sm" onPress={() => setActiveSection("password")}>
                                        <Text>Edit</Text>
                                    </Button>
                                </View>

                                {/* <View className="flex-row items-center justify-between">
                                    <View className="flex-row items-center">
                                        <XIcon className="mr-2 h-5 w-5 text-destructive" />
                                        <Text className="font-medium text-destructive">Delete Account</Text>
                                    </View>
                                    <Button variant="destructive" size="sm" onPress={() => setActiveSection("delete")}>
                                        <Text>Delete</Text>
                                    </Button>
                                </View> */}
                            </View>
                        )}
                    </CardContent>
                </Card>

                {/* Sign Out Button */}
                <Button
                    variant="secondary"
                    className="w-full flex-row items-center justify-center"
                    onPress={handleSignOut}
                    disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator color="white" size="small" />
                    ) : (
                        <>
                            <LogOutIcon className="mr-2 h-5 w-5" />
                            <Text>Sign Out</Text>
                        </>
                    )}
                </Button>
            </View>
        </ScrollView>
    );
}
