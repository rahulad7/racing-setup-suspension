import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://eptghthbzuawtheoemnq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwdGdodGhienVhd3RoZW9lbW5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzODY2NzcsImV4cCI6MjA2ODk2MjY3N30.Ysl6D3fV6-AqHry-lHwcetCq0wBUrDyHZKr4MB94IEY';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };