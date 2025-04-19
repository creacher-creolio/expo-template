import * as React from "react";
import { Pressable, View, type TextInputProps } from "react-native";

import { Input } from "@/components/ui/input";
import { XIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";

interface InputWithIconProps extends TextInputProps {
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    onClear?: () => void;
    showClearButton?: boolean;
    error?: string;
    textContentType?: 'none' | 'URL' | 'addressCity' | 'addressCityAndState' | 'addressState' | 'countryName' | 'creditCardNumber' | 'emailAddress' | 'familyName' | 'fullStreetAddress' | 'givenName' | 'jobTitle' | 'location' | 'middleName' | 'name' | 'namePrefix' | 'nameSuffix' | 'nickname' | 'organizationName' | 'postalCode' | 'streetAddressLine1' | 'streetAddressLine2' | 'sublocality' | 'telephoneNumber' | 'username' | 'password' | 'newPassword' | 'oneTimeCode';
}

const InputWithIcon = React.forwardRef<React.ElementRef<typeof Input>, InputWithIconProps>(
    ({ className, startIcon, endIcon, onClear, showClearButton, value, error, textContentType, ...props }, ref) => {
        const showClear = showClearButton && value && value.length > 0;

        const handleClear = () => {
            if (onClear) {
                onClear();
            }
        };

        return (
            <View className="flex w-full flex-col gap-1.5">
                <View className="relative flex w-full items-center">
                    {startIcon && (
                        <View className="absolute left-3.5 z-10 flex h-full items-center justify-center">
                            {startIcon}
                        </View>
                    )}

                    <Input
                        ref={ref}
                        className={cn(
                            "native:h-14 native:text-base w-full",
                            startIcon && "pl-12",
                            (endIcon || showClear) && "pr-12",
                            error && "border-destructive",
                            className
                        )}
                        value={value}
                        textContentType={textContentType}
                        {...props}
                    />

                    <View className="absolute right-3.5 z-10 flex h-full flex-row items-center justify-center gap-2">
                        {showClear && (
                            <Pressable
                                onPress={handleClear}
                                className="flex h-10 items-center justify-center p-2"
                                accessible={false}
                                accessibilityElementsHidden={true}
                                importantForAccessibility="no"
                                tabIndex={-1}>
                                <XIcon className="h-5 w-5 text-muted-foreground" />
                            </Pressable>
                        )}

                        {endIcon && <View className="flex h-10 items-center justify-center p-2">{endIcon}</View>}
                    </View>
                </View>

                {error ? (
                    <View className="px-1">
                        <View className="text-sm text-destructive">{error}</View>
                    </View>
                ) : null}
            </View>
        );
    }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
