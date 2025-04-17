import { useCallback, useEffect, useState } from "react";

import { supabase } from "@/services/supabase";

// Create inline test functions to avoid path resolution issues
const testConnection = async () => {
    try {
        const { data, error } = await supabase.from("test_items").select("*");

        if (error) {
            console.error("Supabase connection test failed:", error.message);
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (err) {
        console.error("Error testing Supabase connection:", err);
        return { success: false, error: err instanceof Error ? err.message : String(err) };
    }
};

export const useSupabase = () => {
    const [isConnected, setIsConnected] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Function to check Supabase connection
    const checkConnection = useCallback(async () => {
        setError(null);

        try {
            const result = await testConnection();
            setIsConnected(result.success);

            if (!result.success && result.error) {
                setError(result.error);
            }

            return result.success;
        } catch (err) {
            setIsConnected(false);
            setError(err instanceof Error ? err.message : String(err));
            return false;
        }
    }, []);

    // Test connection on mount
    useEffect(() => {
        checkConnection();
    }, [checkConnection]);

    return {
        supabase,
        isConnected,
        error,
        checkConnection,
    };
};
