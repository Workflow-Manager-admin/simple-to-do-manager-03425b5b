import { createClient } from "@supabase/supabase-js";

/**
 * Initializes the Supabase client securely using environment variables.
 * This client is used throughout the application for authentication and database actions.
 */
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing REACT_APP_SUPABASE_URL or REACT_APP_SUPABASE_KEY environment variable.");
}

// PUBLIC_INTERFACE
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
