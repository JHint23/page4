import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
const SUPABASE_URL =  'https://jepsuuzybjlsfqgrzeyw.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImplcHN1dXp5Ympsc2ZxZ3J6ZXl3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxMDQ2NDQsImV4cCI6MjA2NTY4MDY0NH0.t3c3b8UIWRNbSE3tHsMqc1GIN3KwAAuC4daO0eZE2Zg';
export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
