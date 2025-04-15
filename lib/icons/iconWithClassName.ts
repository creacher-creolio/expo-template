import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";

export function iconWithClassName(icon: LucideIcon) {
    cssInterop(icon, {
        className: {
            target: "style",
            defaultProps: {
                className: "text-foreground",
            },
            nativeStyleToProp: {
                color: true,
                opacity: true,
            },
        },
    });
}
