import { Session, User } from "@supabase/supabase-js";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser, getSession, onAuthStateChange } from "@/lib/services/auth";

type AuthContextType = {
    session: Session | null;
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    isLoading: true,
    isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initial session check
        const initializeAuth = async () => {
            try {
                const currentSession = await getSession();
                setSession(currentSession);

                if (currentSession) {
                    const currentUser = await getCurrentUser();
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Error initializing auth:", error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeAuth();

        // Subscribe to auth changes
        const subscription = onAuthStateChange((event, changedSession) => {
            setSession(changedSession);
            setUser(changedSession?.user || null);
        });

        // Cleanup on unmount
        return () => {
            subscription.subscription.unsubscribe();
        };
    }, []);

    const value = {
        session,
        user,
        isLoading,
        isAuthenticated: !!session,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
