import { Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import * as React from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "@/lib/services/auth";
import { supabase } from "@/lib/services/supabase";

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

    // Listen for auth state changes
    useEffect(() => {
        // Check active sessions and subscribe to auth changes
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsLoading(false);
        });

        const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
            console.log("Auth state changed:", session);
            setSession(session);
            setUser(session?.user ?? null);
        });
        // Check initial user state
        supabase.auth.getUser().then(({ data: { user } }) => {
            console.log("Initial user:", user);
            setUser(user ?? null);
            setIsLoading(false);
        });
        return () => authListener.subscription?.unsubscribe();
    }, []);

    // Handle deep links
    useEffect(() => {
        // Handle initial URL
        const handleInitial = async () => {
            const url = await Linking.getInitialURL();
            console.log("Initial URL:", url);
            await auth.handleDeepLink(url);
        };
        handleInitial();

        // Listen for URLs while app is running
        const subscription = Linking.addEventListener("url", ({ url }) => {
            console.log("Incoming URL:", url);
            auth.handleDeepLink(url);
        });

        return () => subscription.remove();
    }, []);

    const value = {
        session,
        user,
        isLoading,
        isAuthenticated: !!session,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
