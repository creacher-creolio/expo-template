import * as React from "react";

import { FormError } from "@/components/auth/common";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface FormProps extends React.ComponentPropsWithoutRef<typeof Card> {
    children: React.ReactNode;
    formError?: string | null;
    onSubmit?: () => void;
    className?: string;
    spacing?: "normal" | "compact" | "none";
}

const FormComponent = React.forwardRef<React.ElementRef<typeof Card>, FormProps>(
    ({ children, formError, onSubmit, className, spacing = "normal", ...props }, ref) => {
        // React Native doesn't support onSubmit like web forms
        // Instead, form submission is typically handled by button presses

        return (
            <Card
                ref={ref}
                className={cn(
                    "w-full border-0 bg-transparent shadow-none",
                    spacing === "normal" && "space-y-4",
                    spacing === "compact" && "space-y-2",
                    className
                )}
                accessibilityRole="none"
                {...props}>
                {children}
                {formError && <FormError error={formError} />}
            </Card>
        );
    }
);

FormComponent.displayName = "Form";

// Memoize for better performance
export const Form = React.memo(FormComponent);
