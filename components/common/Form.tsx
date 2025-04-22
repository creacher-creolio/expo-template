import * as React from "react";
import { View, ViewProps, Platform, AccessibilityRole } from "react-native";

import { cn } from "@/lib/utils";

interface FormProps extends ViewProps {
    onSubmit?: () => void;
    children: React.ReactNode;
}

export const Form = React.forwardRef<View, FormProps>(({ className, onSubmit, children, ...props }, ref) => {
    // Using View with nativeID to ensure it's properly identifiable for web
    return (
        <View
            ref={ref}
            className={cn("flex w-full flex-col gap-5", className)}
            nativeID="form"
            // Note: React Native doesn't have 'form' as an accessibility role
            // but we need the nativeID for web environments
            accessibilityRole={Platform.OS === "web" ? ("form" as AccessibilityRole) : undefined}
            {...props}>
            {children}
        </View>
    );
});

Form.displayName = "Form";
