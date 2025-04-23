import * as React from "react";
import { Animated } from "react-native";

interface AnimationConfig {
    duration?: number;
    toValue?: number;
    useNativeDriver?: boolean;
}

export const useAnimation = (initialValue = 0) => {
    const animatedValue = React.useRef(new Animated.Value(initialValue)).current;

    const animate = React.useCallback(
        (config: AnimationConfig = {}) => {
            const { duration = 300, toValue = 1, useNativeDriver = false } = config;

            return Animated.timing(animatedValue, {
                toValue,
                duration,
                useNativeDriver,
            }).start();
        },
        [animatedValue]
    );

    const animateTo = React.useCallback(
        (value: number, config: Omit<AnimationConfig, "toValue"> = {}) => {
            animate({ ...config, toValue: value });
        },
        [animate]
    );

    return {
        value: animatedValue,
        animate,
        animateTo,
        reset: () => animatedValue.setValue(initialValue),
    };
};
