import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { buscarCandidato, normalizarCandidatoDetalhe } from '@/lib/candidatos/tse';
import { buscarBiografia, buscarMandatoParlamentar, type MandatoParlamentar } from '@/lib/candidatos/mandato';
import {
  BASE_BADGE,
  BASE_EMOJI,
  BarraEspectro,
  EIXO_TEXTO,
  formatarData,
  formatarMoeda,
} from '@/lib/candidatos/ui';
import { getPartyLogoBySigla } from '@/lib/party-logos';
import { SectionSkeleton } from '@/components/ProfileSkeleton';
import { FotoCandidato } from '@/components/candidatos/FotoCandidato';

export const revalidate = 600;
export const dynamicParams = true;

function renderDadosPessoais(candidato: Awaited<ReturnType<typeof normalizarCandidatoDetalhe>>) {
  const detalhes = [
    { label: 'Nome completo', value: candidato.nomeCompleto, emoji: '📛' },
    { label: 'Nome de urna', value: candidato.nomeUrna, emoji: '🗳️' },
    { label: 'Nascimento', value: formatarData(candidato.dataNascimento), emoji: '🎂' },
    { label: 'Sexo', value: candidato.sexo, emoji: '👤' },
    { label: 'Estado civil', value: candidato.estadoCivil, emoji: '💍' },
    { label: 'Cor / raça', value: candidato.corRaca, emoji: '🧬' },
    { label: 'Nacionalidade', value: candidato.nacionalidade, emoji: '🌎' },
    { label: 'Naturalidade', value: candidato.naturalidade, emoji: '📍' },
    { label: 'Escolaridade', value: candidato.grauInstrucao, emoji: '🎓' },
    { label: 'Ocupação', value: candidato.ocupacao, emoji: '💼' },
    { label: 'Número na urna', value: candidato.numero ? String(candidato.numero) : null, emoji: '🔢' },
    { label: 'Situação do registro', value: candidato.situacao, emoji: '📋' },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">📋 Registro e dados oficiais</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Dados do pedido de registro de candidatura publicados pelo TSE.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {detalhes.map((item) => (
          <article key={item.label} className="bg-white border-4 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">{item.emoji} {item.label}</p>
            <p className="font-body font-bold text-base sm:text-lg break-words">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function renderPosicionamento(candidato: Awaited<ReturnType<typeof normalizarCandidatoDetalhe>>) {
  const pos = candidato.posicionamento;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">🧭 Posicionamento político</h2>
          <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
            Estimativa de eixo esquerda–direita — sempre com a base e a justificativa declaradas.
          </p>
        </div>
        <Link href="/candidatos/metodologia" className="font-headline font-black uppercase text-xs border-4 border-black px-3 py-2 bg-primary-container">
          Ver metodologia
        </Link>
      </div>

      <article className="bg-white border-4 border-black p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className={`font-headline font-black text-3xl sm:text-5xl uppercase ${pos.eixo ? EIXO_TEXTO[pos.eixo] : 'text-gray-500'}`}>
            {pos.label}
          </p>
          <span className={`font-headline font-black uppercase text-xs border-2 px-3 py-1.5 ${BASE_BADGE[pos.base]}`}>
            {BASE_EMOJI[pos.base]} Base: {pos.baseLabel}
          </span>
        </div>

        <BarraEspectro eixo={pos.eixo} base={pos.base} />

        <p className="font-body font-medium text-sm sm:text-base leading-relaxed">{pos.resumo}</p>

        {pos.temas.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {pos.temas.map((tema) => (
              <span key={tema} className="bg-surface-container-high border-2 border-black px-2.5 py-1 font-headline font-bold uppercase text-xs">
                {tema}
              </span>
            ))}
          </div>
        ) : null}

        {pos.analisadoEm ? (
          <p className="font-label font-bold uppercase text-[10px] opacity-60">Análise produzida em {formatarData(pos.analisadoEm)}</p>
        ) : null}

        {pos.avisos.map((aviso) => (
          <p key={aviso} className="bg-amber-50 border-2 border-amber-300 text-amber-900 font-body font-medium text-xs sm:text-sm p-3">
            ⚠️ {aviso}
          </p>
        ))}
      </article>
    </section>
  );
}

function renderPlanoGoverno(candidato: Awaited<ReturnType<typeof normalizarCandidatoDetalhe>>) {
  const plano = candidato.planoGoverno;
  const executivo = ['Presidente', 'Governador', 'Vice-presidente', 'Vice-governador'].includes(candidato.cargo);

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">📄 Plano de governo</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Documento oficial registrado no TSE — obrigatório apenas para candidatos do Executivo.
        </p>
      </div>

      <article className="bg-white border-4 border-black p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        {plano.disponivel ? (
          <div className="space-y-4">
            <p className="font-body font-medium text-sm">
              O plano de governo <strong>{plano.nomeArquivo}</strong> está registrado no TSE.
            </p>
            {plano.urlDownload ? (
              <a
                href={plano.urlDownload}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-primary-container border-4 border-black px-5 py-3 font-headline font-black uppercase text-sm hover:bg-primary"
              >
                📥 Baixar plano de governo (PDF oficial)
              </a>
            ) : null}
            <p className="font-label font-bold uppercase text-[10px] opacity-60">
              Fonte: TSE — DivulgaCandContas · Arquivo oficial do registro
            </p>
          </div>
        ) : executivo ? (
          <div className="space-y-2">
            <p className="font-body font-medium text-sm">
              ⏳ Plano de governo ainda não registrado no TSE. O registro de candidaturas abriu em 15/08/2026 e
              os documentos entram gradualmente.
            </p>
            <p className="font-label font-bold uppercase text-[10px] opacity-60">
              Enquanto isso, o posicionamento exibido usa outra base (veja o selo acima).
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="font-body font-medium text-sm">
              ℹ️ Candidatos do Legislativo não têm plano de governo obrigatório por lei (Lei 9.504/97).
            </p>
            <p className="font-label font-bold uppercase text-[10px] opacity-60">
              Por isso o posicionamento é estimado pela posição do partido ou por análise da redação — sempre rotulado.
            </p>
          </div>
        )}
      </article>
    </section>
  );
}

function renderBiografia(biografia: string | null) {
  if (!biografia) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">📖 Biografia</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Trecho introdutório da Wikipédia — fonte independente, revisada pela comunidade.
        </p>
      </div>
      <article className="bg-white border-4 border-black p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <p className="font-body font-medium text-sm sm:text-base leading-relaxed">{biografia}</p>
        <p className="font-label font-bold uppercase text-[10px] opacity-60 mt-3">
          Fonte: Wikipédia (trecho introdutório) · verifique sempre múltiplas fontes
        </p>
      </article>
    </section>
  );
}

function renderMandato(mandato: MandatoParlamentar | null) {
  if (!mandato) return null;

  const { perfil, presenca, ranking, governismo, temasVotacao } = mandato;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">🏛️ Já exerce mandato: dados reais</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Este candidato é {perfil.casa === 'Senado Federal' ? 'senador(a)' : 'deputado(a) federal'} em exercício —
          confira o desempenho real do mandato, não só as promessas.
        </p>
      </div>

      <article className="bg-white border-4 border-black p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-6">
        {mandato.correspondencia === 'provavel' ? (
          <p className="bg-amber-50 border-2 border-amber-300 text-amber-900 font-body font-medium text-xs p-3">
            ⚠️ Correspondência identificada por nome, partido e UF — confira o perfil oficial antes de concluir.
          </p>
        ) : null}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {presenca ? (
            <div className="border-2 border-black bg-surface-container p-4">
              <p className="font-label font-bold uppercase text-[10px] opacity-60 mb-1">👁️ Presença no mandato ({presenca.ano})</p>
              <p className="font-headline font-black text-2xl uppercase">{presenca.percentual.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%</p>
              <p className="font-label font-bold uppercase text-[10px] opacity-60">Fonte: Radar do Congresso</p>
            </div>
          ) : null}

          {ranking ? (
            <div className="border-2 border-black bg-surface-container p-4">
              <p className="font-label font-bold uppercase text-[10px] opacity-60 mb-1">🏅 Nota Ranking dos Políticos</p>
              <p className="font-headline font-black text-2xl uppercase">{ranking.nota.toLocaleString('pt-BR', { minimumFractionDigits: 1 })}</p>
              <p className="font-label font-bold uppercase text-[10px] opacity-60">Fonte: Ranking dos Políticos</p>
            </div>
          ) : null}

          {governismo ? (
            <div className="border-2 border-black bg-surface-container p-4">
              <p className="font-label font-bold uppercase text-[10px] opacity-60 mb-1">📊 Alinhamento com o governo</p>
              <p className="font-headline font-black text-2xl uppercase">{governismo.percentualFavoravel.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}%</p>
              <p className="font-label font-bold uppercase text-[10px] opacity-60">{governismo.votacoesMonitoradas} votações monitoradas</p>
            </div>
          ) : null}
        </div>

        {temasVotacao.length > 0 ? (
          <div className="space-y-2">
            <p className="font-label font-bold uppercase text-xs opacity-70">🗳️ Como votou nos temas que pesam:</p>
            <div className="flex flex-wrap gap-2">
              {temasVotacao.slice(0, 6).map((tema) => (
                <span key={tema.titulo} className="bg-surface-container-high border-2 border-black px-2.5 py-1 font-headline font-bold uppercase text-xs">
                  {tema.titulo}
                  {tema.destaque ? ` · ${tema.destaque}` : ''}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <a
            href={mandato.href}
            className="bg-primary-container border-4 border-black px-5 py-3 font-headline font-black uppercase text-sm hover:bg-primary"
          >
            Ver perfil completo do mandato →
          </a>
          <p className="font-label font-bold uppercase text-[10px] opacity-60 max-w-xs">
            Votações, gastos, autorias, comissões e histórico — dados oficiais da {perfil.casa}.
          </p>
        </div>

        <p className="font-label font-bold uppercase text-[10px] opacity-50">
          Importante: os dados do mandato refletem o exercício atual — não são promessas de campanha para 2026.
        </p>
      </article>
    </section>
  );
}

function renderBens(candidato: Awaited<ReturnType<typeof normalizarCandidatoDetalhe>>) {
  const bens = candidato.bens ?? [];

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">💰 Bens declarados</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Declaração oficial apresentada à Justiça Eleitoral — dados públicos.
        </p>
      </div>

      <article className="bg-white border-4 border-black p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <p className="font-headline font-black text-2xl sm:text-3xl uppercase">
          Total declarado: {formatarMoeda(candidato.totalDeBens)}
        </p>

        {bens.length === 0 ? (
          <p className="font-body font-medium text-sm opacity-70">Nenhum bem declarado até o momento.</p>
        ) : (
          <ul className="divide-y-2 divide-black">
            {bens.slice(0, 15).map((bem) => (
              <li key={bem.ordem} className="py-3 flex flex-wrap items-baseline justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="font-body font-bold text-sm break-words">{bem.descricao}</p>
                  <p className="font-label font-bold uppercase text-[10px] opacity-60 mt-1">{bem.descricaoDeTipoDeBem}</p>
                </div>
                <p className="font-headline font-black text-base uppercase whitespace-nowrap">{formatarMoeda(bem.valor)}</p>
              </li>
            ))}
          </ul>
        )}
        {bens.length > 15 ? (
          <p className="font-label font-bold uppercase text-[10px] opacity-60">
            Exibindo 15 de {bens.length} bens declarados.
          </p>
        ) : null}
      </article>
    </section>
  );
}

function renderSites(candidato: Awaited<ReturnType<typeof normalizarCandidatoDetalhe>>) {
  const sites = candidato.sites ?? [];
  if (sites.length === 0) return null;

  const normalizar = (url: string) => url.toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '');

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">🌐 Canais oficiais declarados</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Site e redes sociais informados pelo candidato ao TSE.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {sites.map((site) => (
          <a
            key={site}
            href={site.toLowerCase().startsWith('http') ? site : `https://${site}`}
            target="_blank"
            rel="noreferrer"
            className="bg-white border-4 border-black px-4 py-2 font-headline font-bold uppercase text-xs hover:bg-primary-container break-all max-w-full"
          >
            {normalizar(site)}
          </a>
        ))}
      </div>
    </section>
  );
}

function renderHistorico(candidato: Awaited<ReturnType<typeof normalizarCandidatoDetalhe>>) {
  const anteriores = candidato.eleicoesAnteriores ?? [];
  const jaFoiEleito = anteriores.some((item) => item.situacaoTotalizacao?.toLowerCase().includes('eleito'));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">🗂️ Trajetória eleitoral</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Participações anteriores em eleições, conforme registro do TSE.
        </p>
      </div>
      {anteriores.length === 0 ? (
        <article className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-body font-bold text-sm sm:text-base">🌟 Primeira candidatura registrada no TSE.</p>
          <p className="font-body font-medium text-xs sm:text-sm opacity-70 mt-1">
            Sem mandatos anteriores — o que você vê aqui é a proposta e o histórico público disponível até o momento.
          </p>
        </article>
      ) : jaFoiEleito ? null : (
        <article className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-body font-bold text-sm sm:text-base">🗳️ Já concorreu antes, sem mandato parlamentar.</p>
          <p className="font-body font-medium text-xs sm:text-sm opacity-70 mt-1">
            As candidaturas abaixo constam no TSE; nenhuma resultou em mandato até o momento.
          </p>
        </article>
      )}
      {anteriores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {anteriores.map((item) => (
            <article key={`${item.nrAno}-${item.id}`} className="bg-white border-4 border-black p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
              <p className="font-headline font-black text-lg uppercase">{item.nrAno} · {item.cargo}</p>
              <p className="font-body font-bold uppercase text-xs">{item.partido} · {item.local}</p>
              <p className={`font-label font-bold uppercase text-[10px] ${item.situacaoTotalizacao?.toLowerCase().includes('eleito') ? 'text-emerald-700' : 'opacity-70'}`}>
                {item.situacaoTotalizacao ?? '—'}
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function renderAvisosInelegibilidade(candidato: Awaited<ReturnType<typeof normalizarCandidatoDetalhe>>) {
  if (!candidato.motivosInelegibilidade.length) return null;

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-2xl sm:text-4xl uppercase">⚠️ Situação judicial do registro</h2>
        <p className="font-body font-bold uppercase text-xs sm:text-sm opacity-70 mt-2">
          Sinais declarados pelo TSE no pedido de registro. Consulte sempre a fonte oficial.
        </p>
      </div>
      <div className="bg-red-50 border-4 border-red-700 p-5 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] space-y-2">
        {candidato.motivosInelegibilidade.map((motivo) => (
          <p key={motivo} className="font-body font-bold text-sm sm:text-base">🚫 {motivo}</p>
        ))}
        <p className="font-label font-bold uppercase text-[10px] opacity-70 mt-2">
          Isso não significa condenação definitiva — o registro ainda pode ser julgado. Verifique o processo na fonte oficial.
        </p>
      </div>
    </section>
  );
}

export default async function CandidatoDetalhePage({
  params,
}: {
  params: Promise<{ ano: string; uf: string; id: string }>;
}) {
  const { ano: anoParam, uf: ufParam, id: idParam } = await params;
  const ano = Number(anoParam) || 2026;
  const uf = ufParam.toUpperCase();
  const idTse = Number(idParam);

  if (!Number.isFinite(idTse) || idTse <= 0) notFound();

  const bruto = await buscarCandidato(ano, uf, idTse).catch(() => null);
  if (!bruto) notFound();

  const sqEleicao = bruto.eleicao?.id ?? 20322002026;
  const candidato = await normalizarCandidatoDetalhe(bruto, ano, sqEleicao, uf);

  const [biografia, mandato] = await Promise.all([
    buscarBiografia(candidato.nomeCompleto || candidato.nomeUrna).catch(() => null),
    buscarMandatoParlamentar(candidato).catch(() => null),
  ]);

  const logo = getPartyLogoBySigla(candidato.partido ?? '');
  const pos = candidato.posicionamento;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-10 md:py-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto space-y-10 md:space-y-12">
          {/* Cabeçalho */}
          <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8">
              <div className="aspect-[4/3] border-4 border-black bg-surface-container-high overflow-hidden">
                <FotoCandidato
                  sqEleicao={candidato.sqEleicao}
                  id={candidato.idTse}
                  uf={candidato.uf}
                  nome={candidato.nomeUrna}
                />
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  {logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={logo} alt={`Logo ${candidato.partido}`} className="w-10 h-10 object-contain rounded-full bg-white border-2 border-black p-1" />
                  ) : null}
                  <span className="font-label font-bold uppercase text-xs bg-surface-container-high border-2 border-black px-2 py-1">
                    {candidato.cargo} · {candidato.uf} · {ano}
                  </span>
                  <span className="font-label font-bold uppercase text-xs bg-primary-container border-2 border-black px-2 py-1">
                    Nº {candidato.numero}
                  </span>
                </div>

                <h1 className="font-headline font-black text-3xl md:text-6xl uppercase leading-none">
                  {candidato.nomeUrna}
                </h1>

                <div className="space-y-1 font-body font-bold uppercase text-xs sm:text-sm">
                  <p>{candidato.partido ?? 'Sem partido'}{candidato.coligacao ? ` · Coligação: ${candidato.coligacao}` : ''}</p>
                  <p className={candidato.situacao.toLowerCase().includes('indeferido') || candidato.situacao.toLowerCase().includes('inapto') ? 'text-red-700' : 'opacity-80'}>
                    Situação do registro: {candidato.situacao}
                  </p>
                  <p className="opacity-60">Totalização: {candidato.totalizacao ?? '—'}</p>
                </div>

                <div className="pt-2 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`font-headline font-black uppercase text-2xl ${pos.eixo ? EIXO_TEXTO[pos.eixo] : 'text-gray-500'}`}>
                      {pos.label}
                    </span>
                    <span className={`font-label font-bold uppercase text-[10px] border-2 px-2 py-1 ${BASE_BADGE[pos.base]}`}>
                      {BASE_EMOJI[pos.base]} {pos.baseLabel}
                    </span>
                  </div>
                  <BarraEspectro eixo={pos.eixo} base={pos.base} />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <a
                    href={candidato.fonteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-primary-container border-4 border-black px-5 py-2.5 font-headline font-black uppercase text-xs hover:bg-primary"
                  >
                    Ver no site oficial do TSE ↗
                  </a>
                  <Link
                    href={`/candidatos?uf=${candidato.uf}&cargo=${candidato.cargoCodigo}`}
                    className="border-4 border-black px-5 py-2.5 font-headline font-black uppercase text-xs hover:bg-surface-container-high"
                  >
                    ← Ver outros candidatos
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <Suspense fallback={<SectionSkeleton />}>
            {renderPosicionamento(candidato)}
          </Suspense>

          {renderBiografia(biografia)}

          {renderMandato(mandato)}

          {renderPlanoGoverno(candidato)}

          {renderAvisosInelegibilidade(candidato)}

          <Suspense fallback={<SectionSkeleton />}>
            {renderDadosPessoais(candidato)}
          </Suspense>

          {renderBens(candidato)}

          {renderSites(candidato)}

          {renderHistorico(candidato)}

          <section className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-xl uppercase mb-3">🔗 Fonte oficial</h2>
            <p className="font-body font-medium text-sm">
              Dados públicos do <a className="font-bold underline" href="https://divulgacandcontas.tse.jus.br/" target="_blank" rel="noreferrer">
              TSE — Divulgação de Candidaturas e Contas Eleitorais</a>.
              Última atualização no TSE: {formatarData(candidato.dataUltimaAtualizacao)}.
              A atualização dos dados de candidatura ocorre a cada 60 minutos no TSE.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
