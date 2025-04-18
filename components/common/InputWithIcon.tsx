import * as React from "react";
import { View, type TextInputProps } from "react-native";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface InputWithIconProps extends TextInputProps {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
}

const InputWithIcon = React.forwardRef<React.ElementRef<typeof Input>, InputWithIconProps>(
    ({ className, startIcon, endIcon, ...props }, ref) => {
        return (
            <View className="relative flex w-full items-center">
                {startIcon && (
                    <View className="absolute left-3 z-10 flex h-full items-center justify-center">{startIcon}</View>
                )}
                <Input
                    ref={ref}
                    className={cn("w-full", startIcon && "pl-10", endIcon && "pr-10", className)}
                    {...props}
                />
                {endIcon && (
                    <View className="absolute right-3 z-10 flex h-full items-center justify-center">{endIcon}</View>
                )}
            </View>
        );
    }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
