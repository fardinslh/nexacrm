import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://frsxmyckzimlxljbiflu.supabase.co'
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyc3hteWNremltbHhsamJpZmx1Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NTkxMDYxMCwiZXhwIjoyMTAxNDg2NjEwfQ.Ctv8Z1zOBuQEeQJOGQl-fg_0X8cBZblK_4joWRgcrko'

  return createSupabaseClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  })
}
