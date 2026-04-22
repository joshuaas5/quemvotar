import { supabase } from './supabase';

const DEFAULT_TTL_SECONDS = 86400; // 24h

export async function getCache<T>(key: string): Promise<T | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('cache_api')
    .select('value, expires_at')
    .eq('key', key)
    .single();

  if (error || !data) return null;

  const now = new Date();
  const expires = new Date(data.expires_at);
  if (now > expires) {
    await supabase.from('cache_api').delete().eq('key', key);
    return null;
  }

  return data.value as T;
}

export async function setCache<T>(key: string, value: T, ttlSeconds = DEFAULT_TTL_SECONDS): Promise<void> {
  if (!supabase) return;

  const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();

  await supabase
    .from('cache_api')
    .upsert({ key, value, expires_at: expiresAt }, { onConflict: 'key' });
}
