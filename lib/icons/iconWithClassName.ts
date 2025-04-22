import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import { Platform } from "react-native";

import { cn } from "../utils";

// List of responder props that cause warnings on web
const RESPONDER_PROPS = [
    "onResponderTerminate",
    "onResponderTerminationRequest",
    "onStartShouldSetResponder",
    "onStartShouldSetResponderCapture",
    "onMoveShouldSetResponder",
    "onMoveShouldSetResponderCapture",
    "onResponderGrant",
    "onResponderReject",
    "onResponderMove",
    "onResponderRelease",
    "onResponderEnd",
    "onResponderStart",
];

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
        const mergedProps = { className: cn("text-foreground", props.className), ...props };

        // Filter out responder props when running on web
        if (Platform.OS === "web") {
            RESPONDER_PROPS.forEach(prop => {
                if (prop in mergedProps) {
                    delete mergedProps[prop];
                }
            });
        }

        return icon(mergedProps);
    };
    return wrappedIcon as LucideIcon;
}
