import { LucideIcon } from "lucide-react-native";
import * as React from "react";
import { Platform, View, type ViewProps } from "react-native";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

interface CrossPlatformAlertProps extends ViewProps {
    icon: LucideIcon;
    title?: string;
    description?: string;
    variant?: "default" | "destructive";
    iconSize?: number;
    iconClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
    children?: React.ReactNode;
}

/**
 * Cross-platform alert component that provides consistent
 * behavior between iOS and web platforms
 */
export function CrossPlatformAlert({
    icon,
    title,
    description,
    variant = "default",
    iconSize = 16,
    iconClassName,
    titleClassName,
    descriptionClassName,
    children,
    className,
    ...props
}: CrossPlatformAlertProps) {
    const isWeb = Platform.OS === "web";

    // Apply web-specific adjustments as needed
    const webClassName = isWeb ? "web:shadow-md web:overflow-hidden" : "";

    return (
        <View className={cn("w-full", className)} {...props}>
            <Alert
                variant={variant}
                icon={icon}
                iconSize={iconSize}
                iconClassName={iconClassName}
                className={cn(webClassName, "relative")}>
                {title && <AlertTitle className={titleClassName}>{title}</AlertTitle>}
                {description && <AlertDescription className={descriptionClassName}>{description}</AlertDescription>}
                {children}
            </Alert>
        </View>
    );
}
