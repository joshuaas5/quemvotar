/**
 * Cache em memória simples para o servidor Node.js.
 * Persiste entre requisições no mesmo processo/serverless function.
 * Não depende de Supabase/Redis — zero configuração.
 * Limite máximo de 500 entradas (LRU eviction).
 */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

const MAX_ENTRIES = 500;
const memoryStore = new Map<string, CacheEntry<unknown>>();

export function getMemoryCache<T>(key: string): T | null {
  const entry = memoryStore.get(key);
  if (!entry) return null;

  if (Date.now() > entry.expiresAt) {
    memoryStore.delete(key);
    return null;
  }

  // LRU: move para o final (mais recentemente usado)
  memoryStore.delete(key);
  memoryStore.set(key, entry);

  return entry.value as T;
}

export function setMemoryCache<T>(key: string, value: T, ttlSeconds: number): void {
  // LRU eviction: se atingiu o limite, remove o mais antigo (primeiro do Map)
  if (memoryStore.size >= MAX_ENTRIES && !memoryStore.has(key)) {
    const firstKey = memoryStore.keys().next().value;
    if (firstKey) {
      memoryStore.delete(firstKey);
    }
  }

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
    maxEntries: MAX_ENTRIES,
    keys: Array.from(memoryStore.keys()),
  };
}
