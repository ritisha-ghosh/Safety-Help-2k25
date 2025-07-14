import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.")
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (for Route Handlers, Server Actions)
// Note: For server-side, you might want to use a service role key for more privileges,
// but for client-facing actions, the anon key is sufficient.
// For more secure server-side operations, consider using a dedicated server client
// with the service role key, but ensure it's never exposed to the client.
export const createServerSupabaseClient = () => createClient(supabaseUrl, supabaseAnonKey)
