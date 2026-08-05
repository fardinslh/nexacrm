import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://frsxmyckzimlxljbiflu.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyc3hteWNremltbHhsamJpZmx1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MTA2MTAsImV4cCI6MjEwMTQ4NjYxMH0.1fb7AdDgSYTerlt9gtQ_opsccPgYcNMisFIOclNbmeE'
  return createBrowserClient(url, key)
}
