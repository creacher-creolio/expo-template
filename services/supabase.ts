import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase URL or Anon Key");
}

// Check if we're running in a browser or native environment
const isNonWebEnvironment = Platform.OS !== "web" || (typeof document !== "undefined" && typeof window !== "undefined");

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: isNonWebEnvironment ? AsyncStorage : undefined,
        autoRefreshToken: true,
        persistSession: isNonWebEnvironment,
        detectSessionInUrl: false,
    },
});
