# Arquitetura de Escala — QuemVotar (custo R$ 0)

> Objetivo: suportar milhões de acessos mensais sem pagar nada por infraestrutura,
> mantendo dados oficiais e rastreáveis (TSE, Câmara, Senado).

## Diagnóstico atual (18/08/2026)

- Hospedagem: **Vercel (Hobby)** — 100 GB de banda/mês e ~100k invocações de função/mês.
- 30 cliques/dia hoje. Com tráfego real, o gargalo é **banda** (HTML + JSON + imagens) e
  **requests dinâmicos** (cada página de candidato busca o TSE ao vivo).
- TSE: API pública e gratuita, mas instável (retry/backoff já implementado) e **sem busca
  global por nome**.

## Princípio central

> **"Static-first, edge-cache, zero egress."**
> O que é dado (JSON, fotos) sai do Cloudflare R2 — a única nuvem grande sem cobrança
> de saída de dados. A Vercel só serve HTML leve. Dados dinâmicos em tempo real (registro
> de candidatura, que muda a cada 60 min no TSE) viram **snapshots** gerados por um cron.

## Camadas

```
┌────────────────────────────────────────────────────────────────┐
│ CRON (GitHub Actions, grátis)                                  │
│ a cada 60 min: scripts/sync-candidatos.ts                       │
│   TSE → normaliza → posicionamento → JSON + fotos               │
│   → public/dados/candidatos/*.json (repo) e/ou R2 (fase 2)      │
└────────────────────────────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────────────────────────────┐
│ CLOUDFLARE (grátis, fase 2)                                    │
│ R2 (10 GB, egress R$0, cache CF) → datasets + fotos            │
│ Worker (100k req/dia) → busca full-text (D1/FTS5) — fase 3     │
└────────────────────────────────────────────────────────────────┘
        │
        ▼
┌────────────────────────────────────────────────────────────────┐
│ VERCEL (Hobby) — só HTML + páginas                              │
│ /candidatos, /candidatos/2026/*, /match/candidatos (client)     │
│ proxy de foto passa a apontar para o R2 (fase 2)                │
└────────────────────────────────────────────────────────────────┘
```

## Por que Cloudflare R2 e não outro

| Provedor grátis | Banda/egress | Problema para este caso |
|---|---|---|
| Vercel Hobby | 100 GB/mês | estoura com tráfego real |
| Netlify Free | 100 GB/mês | idem |
| GitHub Pages | ~100 GB/mês (soft) | só estático, sem headers finos |
| Supabase Free | 5 GB/mês egress | pequeno para milhões de JSONs |
| **Cloudflare R2** | **ilimitado (R$ 0)** | storage 10 GB grátis + cache de borda |

## Limites do tier grátis (Cloudflare) — matemática honesta

- **R2**: 10 GB de armazenamento, 10M leituras/mês (Class B). Dataset estimado:
  ~30k candidatos → resumos ~4 MB, perfis ~60 MB, fotos ~300 MB → **cabe em 10 GB**.
  Com cache de borda (TTL 1 h), cada objeto é lido do R2 ~1x/hora → ~30k leituras/dia,
  muito abaixo dos 10M/mês.
- **Worker**: 100k requisições/dia. Só recebe cache-miss (busca e APIs leves). Folga enorme.
- **D1 (SQLite)**: 5 GB, 5M leituras/dia — para busca FTS5 de 30k candidatos.
- **GitHub Actions**: repo **público = minutos ilimitados**; privado = 2.000 min/mês
  (24 runs/dia × ~3 min = ~2.160 — apertado; deixar o repo público resolve, ou rodar
  a cada 2 h).

## Fases

### Fase 1 — AGORA (R$ 0, sem conta nova)
- [x] Integração ao vivo TSE (feita): `/candidatos`, perfis, posicionamento em 3 camadas.
- [ ] `scripts/sync-candidatos.ts` — ETL que gera snapshots JSON no repo:
  `public/dados/candidatos/{UF}-{cargo}.json` + `index.json` (base do Match e da busca).
- [ ] **Match Candidatos 2026** — 100% client-side (lê o index.json; zero servidor).
- [ ] Workflow `.github/workflows/sync-candidatos.yml` — cron horário (ou manual).

### Fase 2 — quando criar a conta Cloudflare (grátis, ~10 min)
- [ ] Bucket R2 `quemvotar-dados` + domínio público (ex.: `dados.quemvotar.com.br`).
- [ ] ETL com `--upload-r2` (env `R2_*`): sobe datasets + fotos para o R2.
- [ ] Constante `DATA_BASE_URL` aponta para o R2; proxy de foto passa a ler do R2.
- [ ] Vercel passa a servir só HTML → banda cai ~90%.

### Fase 3 — busca global + ranking (R$ 0)
- [ ] Worker + D1 com FTS5: busca por nome em todo o Brasil, ranking por eixo,
  comparação lado a lado. Cache de borda em tudo.

## Regras de ouro

1. **Nunca** fazer request síncrono ao TSE no caminho crítico de leitura (feito: cache ISR).
2. **Sempre** cachear na borda (TTL curto para dados de registro, longo para fotos).
3. Dados oficiais e estimativas de posicionamento **separados e rotulados** (feito).
4. ETL idempotente: rodar 1x ou 100x dá o mesmo resultado.
5. Se um dia o tráfego exigir, o único custo possível é a Vercel Pro (~US$20/mês) —
   e só se quisermos manter SSR lá; a alternativa é migrar o app para Cloudflare Pages
   (estático + funções) e zerar até isso.

## Como rodar o ETL localmente

~~~bash
npm install        # já inclui tsx (devDependency)
npx tsx scripts/sync-candidatos.ts --uf PR          # só Paraná (rápido)
npx tsx scripts/sync-candidatos.ts                  # Brasil inteiro (27 UFs × 6 cargos)
npx tsx scripts/sync-candidatos.ts --cargo 1        # só presidente
~~~

Saída: `public/dados/candidatos/*.json` — servidos estaticamente pela Vercel hoje,
pelo R2 amanhã, sem mudar o código de leitura (constante `DATA_BASE_URL`).
