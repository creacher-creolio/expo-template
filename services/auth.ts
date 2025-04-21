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
export const signInWithPassword = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
};

// Sign in with magic link
export const signInWithMagicLink = async (email: string) => {
    const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: process.env.EXPO_PUBLIC_AUTH_REDIRECT_URL,
        },
    });

    if (error) throw error;
    return data;
};

// Reset password
export const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: process.env.EXPO_PUBLIC_AUTH_REDIRECT_URL,
    });

    if (error) throw error;
    return data;
};

// Update user password
export const updatePassword = async (newPassword: string) => {
    const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (error) throw error;
    return data;
};

// Update user email
export const updateEmail = async (newEmail: string) => {
    const { data, error } = await supabase.auth.updateUser({
        email: newEmail,
    });

    if (error) throw error;
    return data;
};

// Delete user account
export const deleteUser = async () => {
    const { error } = await supabase.auth.admin.deleteUser((await getCurrentUser())?.id || "");

    if (error) throw error;
    return { success: true };
};

// Invite user by email (initiates signup)
export const inviteUser = async (email: string) => {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);

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
