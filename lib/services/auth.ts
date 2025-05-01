import { User } from "@supabase/supabase-js";
import { makeRedirectUri } from "expo-auth-session";
import * as QueryParams from "expo-auth-session/build/QueryParams";
import * as WebBrowser from "expo-web-browser";

import { supabase } from "./supabase";

WebBrowser.maybeCompleteAuthSession(); // required for web only
const redirectTo = makeRedirectUri({
    scheme: "basetemplate",
    path: "(tabs)",
});

// Core authentication functions
export const auth = {
    // Email/Password authentication
    async signUp(email: string, password: string) {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        return data;
    },

    async signInWithPassword(email: string, password: string) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) throw error;
        return data;
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    // Magic link authentication
    async sendMagicLink(email: string) {
        const { data, error } = await supabase.auth.signInWithOtp({
            email,
            options: { emailRedirectTo: redirectTo },
        });
        if (error) throw error;
        return data;
    },

    // Password management
    async resetPassword(email: string) {
        const { data, error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
        if (error) throw error;
        return data;
    },

    async updatePassword(newPassword: string) {
        const { data, error } = await supabase.auth.updateUser({
            password: newPassword,
        });
        if (error) throw error;
        return data;
    },

    // Profile management
    async updateEmail(newEmail: string) {
        const { data, error } = await supabase.auth.updateUser({
            email: newEmail,
        });
        if (error) throw error;
        return data;
    },

    // Deep linking handler
    async handleDeepLink(url: string | null) {
        if (!url) return null;

        const { params, errorCode } = QueryParams.getQueryParams(url);
        if (errorCode) throw new Error(errorCode);

        const { access_token, refresh_token } = params;
        if (!access_token) return null;

        const { data, error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
        });
        if (error) throw error;
        return data.session;
    },

    // Session management
    async getCurrentUser(): Promise<User | null> {
        const {
            data: { user },
            error,
        } = await supabase.auth.getUser();
        if (error) throw error;
        return user;
    },
};

// Delete user account
export const deleteUser = async () => {
    const user = await auth.getCurrentUser();
    const { error } = await supabase.auth.admin.deleteUser(user?.id || "");

    if (error) throw error;
    return { success: true };
};

// Invite user by email (initiates signup)
export const inviteUser = async (email: string) => {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email);
    if (error) throw error;
    return data;
};
