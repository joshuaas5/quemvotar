/**
 * Cache em memória simples para o servidor Node.js.
 * Persiste entre requisições no mesmo processo/serverless function.
 * Não depende de Supabase/Redis — zero configuração.
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const memoryStore = new Map<string, CacheEntry<unknown>>();

export function getMemoryCache<T>(key: string): T | null {
  const entry = memoryStore.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    memoryStore.delete(key);
    return null;
  }

  return entry.value as T;
}

export function setMemoryCache<T>(key: string, value: T, ttlSeconds: number): void {
  memoryStore.set(key, {
    value,
    expiresAt: Date.now() + ttlSeconds * 1000,
  });
}

export function clearMemoryCache(key?: string): void {
  if (key) {
    memoryStore.delete(key);
  } else {
    memoryStore.clear();
  }
}

export function getMemoryCacheStats() {
  return {
    entries: memoryStore.size,
    keys: Array.from(memoryStore.keys()),
  };
}
