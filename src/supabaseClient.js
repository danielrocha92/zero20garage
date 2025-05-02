import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://fyuwnxmxgsktqjpwinek.supabase.co';
const supabaseAnonKey  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5dXdueG14Z3NrdHFqcHdpbmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxNTY1NzQsImV4cCI6MjA2MTczMjU3NH0.4NGfqLXUCcU0PNqL9CEDRu9lNDZ2qEd9zg7KvjXAnGE';
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
