import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { Platform } from "react-native";

import { cn } from "../utils";

export function iconWithClassName(icon: LucideIcon) {
    cssInterop(icon, {
        className: {
            target: "style",
            nativeStyleToProp: {
                color: true,
                opacity: true,
            },
        },
    });

    // Wrap icon to set default className
    const wrappedIcon = (props: any) => {
        // For web platform, extract only the props we need
        // This avoids passing unknown props like onResponderTerminate to DOM
        if (Platform.OS === "web") {
            const {
                className,
                color,
                size,
                stroke,
                strokeWidth,
                style,
                fill,
                // Explicitly omit responder props that cause warnings
                onResponderTerminate,
                onResponderTerminationRequest,
                onStartShouldSetResponder,
                onStartShouldSetResponderCapture,
                onMoveShouldSetResponder,
                onMoveShouldSetResponderCapture,
                onResponderGrant,
                onResponderReject,
                onResponderMove,
                onResponderRelease,
                onResponderEnd,
                onResponderStart,
                ...restProps
            } = props;

            // Only pass the props that web SVG components need
            return icon({
                className: cn("text-foreground", className),
                color,
                size,
                stroke,
                strokeWidth,
                style,
                fill,
                ...restProps
            });
        }

        // For native platforms, pass all props through
        const mergedProps = { className: cn("text-foreground", props.className), ...props };
        return icon(mergedProps);
    };

    return wrappedIcon as LucideIcon;
}
