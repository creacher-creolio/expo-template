import * as React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon } from "@/lib/icons";

interface FormErrorProps {
    error?: string | null;
    showIcon?: boolean;
}

const FormErrorComponent = ({ error, showIcon = true }: FormErrorProps) => {
    if (!error) return null;

    return (
        <Alert
            variant="destructive"
            className="my-2 py-2"
            icon={AlertTriangleIcon}
            iconSize={16}
            iconClassName="text-destructive">
            <AlertDescription className="pl-7 text-destructive">{error}</AlertDescription>
        </Alert>
    );
};

// Use React.memo for performance optimization
export const FormError = React.memo(FormErrorComponent);
