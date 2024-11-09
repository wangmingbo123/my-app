// lib/supabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
console.log(supabaseUrl);
console.log(supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);