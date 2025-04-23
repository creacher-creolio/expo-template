import { User } from "@supabase/supabase-js";
import * as React from "react";
import { View, Animated } from "react-native";

import { DeleteAccountForm, UpdateEmailForm, UpdatePasswordForm } from "@/components/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { UserIcon, MailIcon, LockIcon, XIcon } from "@/lib/icons";

interface AccountSettingsCardProps {
    user: User | null;
    onSuccessMessage: (message: string) => void;
    onError: (error: Error) => void;
    onDeleteSuccess: () => Promise<void>;
}

export const AccountSettingsCard = ({ user, onSuccessMessage, onError, onDeleteSuccess }: AccountSettingsCardProps) => {
    const [activeSection, setActiveSection] = React.useState<"email" | "password" | "delete" | null>(null);

    // Animation value for section expansion
    const animatedHeight = React.useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.timing(animatedHeight, {
            toValue: activeSection ? 1 : 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [activeSection, animatedHeight]);

    return (
        <Card className="mb-6">
            <CardHeader className="flex-row items-center">
                <UserIcon className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>Account Settings</CardTitle>
                {activeSection && (
                    <Button variant="ghost" size="icon" onPress={() => setActiveSection(null)} className="ml-auto">
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
                                onSuccess={() => onSuccessMessage("Email update has been initiated. Check your inbox.")}
                                onError={onError}
                            />
                        )}
                        {activeSection === "password" && (
                            <UpdatePasswordForm
                                onSuccess={() => onSuccessMessage("Password updated successfully")}
                                onError={onError}
                            />
                        )}
                        {activeSection === "delete" && (
                            <DeleteAccountForm
                                email={user?.email || ""}
                                onSuccess={onDeleteSuccess}
                                onError={onError}
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

                        {/* Commented out delete account option */}
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
    );
};
