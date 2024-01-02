import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://nfjvcnyaqyorsaffchbk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5manZjbnlhcXlvcnNhZmZjaGJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM5MDA0NTcsImV4cCI6MjAxOTQ3NjQ1N30.nc6WSw3xBHMuFVtLxcdeEuyokQ_L9CYFFUWf2X44fIs',
)

export default supabase
