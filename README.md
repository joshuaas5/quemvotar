# QuemVotar - Consulta Pública de Parlamentares

Plataforma cívica para consulta de parlamentares em exercício com base em dados oficiais e rastreáveis.

Proposta:

- facilitar acesso do cidadão a dados legislativos
- reduzir voto no escuro
- concentrar fontes oficiais em uma experiência única

## Funcionalidades atuais

- Busca por parlamentar, partido e UF
- Vitrine de parlamentares em exercício
- Dashboard com panorama do Congresso
- Página de ranking
- Páginas de partidos e perfis individuais
- Camada de APIs internas para consolidar fontes oficiais

Rotas relevantes:

- src/app/page.tsx
- src/app/parlamentares/page.tsx
- src/app/ranking/page.tsx
- src/app/partidos/page.tsx
- src/app/perfil/[fonte]/[id]/page.tsx
- src/app/api/fontes/*

## Fontes de dados (integrações)

- Câmara dos Deputados
- Senado Federal
- TSE
- CNJ

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase (camada opcional de suporte)

## Como rodar localmente

~~~bash
npm install
npm run dev
~~~

Build:

~~~bash
npm run build
npm run start
~~~

## Qualidade e segurança

- README reescrito para documentação real do produto
- dependência Next.js atualizada para correção de advisory de segurança
- credenciais de Supabase tratadas como opcionais por ambiente

## Status do produto

Projeto em evolução contínua, com foco em transparência pública e usabilidade para decisão eleitoral.