import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Replace these with your Supabase project credentials
const SUPABASE_URL = ' https://sldvektleahjxusbrbsa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZHZla3RsZWFoanh1c2JyYnNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTMwMTUsImV4cCI6MjA5MTU4OTAxNX0.xwDyqNO7mdGqLDnkwsO2WRf_apwIeKQvELgymv1JMig';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
