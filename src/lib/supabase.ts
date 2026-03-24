import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Credenciais do Supabase ausentes no .env.local. A conexão com o banco pode falhar.');
}

// Inicializa e exporta o cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
