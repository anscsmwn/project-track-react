import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nfjvcnyaqyorsaffchbk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5manZjbnlhcXlvcnNhZmZjaGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5MDA0NTcsImV4cCI6MjAxOTQ3NjQ1N30.nc6WSw3xBHMuFVtLxcdeEuyokQ_L9CYFFUWf2X44fIs',
)

export const supabaseAdmin =  createClient(
  'https://nfjvcnyaqyorsaffchbk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5manZjbnlhcXlvcnNhZmZjaGJrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzkwMDQ1NywiZXhwIjoyMDE5NDc2NDU3fQ.0Lj9xYqu7H8FhsTSRb34XGUZ99TD_wIZNxyoySAvEog',
)

export default supabase
