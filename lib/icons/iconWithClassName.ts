import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";

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
        const mergedProps = { className: cn("text-foreground", props.className), ...props };
        return icon(mergedProps);
    };
    return wrappedIcon as LucideIcon;
}
