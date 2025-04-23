import { User } from "@supabase/supabase-js";
import * as React from "react";
import { View } from "react-native";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { UserIcon } from "@/lib/icons";

interface UserInfoCardProps {
    user: User | null;
}

export const UserInfoCard = ({ user }: UserInfoCardProps) => {
    return (
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
    );
};
