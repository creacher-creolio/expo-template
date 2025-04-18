import { Session, User } from "@supabase/supabase-js";

import { supabase } from "./supabase";

// Sign up a new user with email and password
export const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) throw error;
    return data;
};

// Sign in with email and password
export const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
};

// Sign out the current user
export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
};

// Get the current session
export const getSession = async (): Promise<Session | null> => {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
};

// Get the current user
export const getCurrentUser = async (): Promise<User | null> => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
};

// Refresh the current session
export const refreshSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) throw error;
    return data;
};

// Listen for auth state changes
export const onAuthStateChange = (callback: (event: any, session: Session | null) => void) => {
    const { data } = supabase.auth.onAuthStateChange(callback);
    return data;
};
