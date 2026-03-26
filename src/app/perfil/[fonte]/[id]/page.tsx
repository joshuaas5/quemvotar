import Link from 'next/link';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { getCasaBadge, getFonteBadge, getPerfilDetalhado } from '@/lib/api';
import type { PerfilDetalhadoPublico, PerfilItemLista } from '@/lib/official';

export const dynamic = 'force-dynamic';

function formatDate(value?: string | null) {
  if (!value) {
    return null;
  }

  if (/^\d{4}-\d{2}-\d{2}/.test(value)) {
    const date = new Date(value);

    if (!Number.isNaN(date.getTime())) {
      return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(date);
    }
  }

  return value;
}

function formatHighlight(value?: string) {
  if (!value) {
    return null;
  }

  const moneyMatch = value.match(/^R\$ (\d+(?:\.\d{2})?)$/);

  if (moneyMatch) {
    const amount = Number(moneyMatch[1]);
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  }

  return value;
}

function renderListSection(
  title: string,
  description: string,
  items: PerfilItemLista[],
  emptyText: string,
) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-4xl uppercase">{title}</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">{description}</p>
      </div>

      {items.length === 0 ? (
        <div className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <p className="font-body font-bold">{emptyText}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <article
              key={`${title}-${item.titulo}-${item.data ?? index}`}
              className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            >
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="max-w-2xl">
                    {item.data ? (
                      <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                        {formatDate(item.data)}
                      </p>
                    ) : null}
                    <h3 className="font-headline font-black text-2xl uppercase leading-tight">
                      {item.titulo}
                    </h3>
                  </div>
                  {item.destaque ? (
                    <span className="bg-primary-container border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                      {formatHighlight(item.destaque)}
                    </span>
                  ) : null}
                </div>

                {item.descricao ? (
                  <p className="font-body font-medium">{item.descricao}</p>
                ) : null}

                {item.detalhe ? (
                  <p className="font-label font-bold uppercase text-xs opacity-70">
                    {item.detalhe}
                  </p>
                ) : null}

                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-headline font-black uppercase border-b-4 border-black w-max"
                  >
                    Abrir fonte oficial
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function renderSobreSection(perfil: PerfilDetalhadoPublico) {
  const detalhes = [
    { label: 'Nome completo', value: perfil.nomeCompleto },
    { label: 'Nascimento', value: formatDate(perfil.dataNascimento) },
    { label: 'Naturalidade', value: perfil.naturalidade },
    { label: 'Sexo', value: perfil.sexo },
    { label: 'E-mail institucional', value: perfil.email },
    {
      label: 'Telefones oficiais',
      value: perfil.telefones.length > 0 ? perfil.telefones.join(' • ') : null,
    },
    { label: 'Gabinete', value: perfil.gabinete },
    { label: 'Escolaridade', value: perfil.escolaridade },
    { label: 'Site pessoal', value: perfil.sitePessoal },
  ].filter((item) => Boolean(item.value));

  return (
    <section className="space-y-6">
      <div>
        <h2 className="font-headline font-black text-4xl uppercase">Raio-X Oficial</h2>
        <p className="font-body font-bold uppercase text-sm opacity-70 mt-2">
          Esta seção reúne identificação, contato e dados biográficos retornados pelas fontes
          oficiais já integradas no projeto.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {detalhes.map((item) => (
          <article
            key={item.label}
            className="bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">{item.label}</p>
            <p className="font-body font-bold text-lg break-words">{item.value}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default async function PerfilPage({
  params,
}: {
  params: Promise<{ fonte: string; id: string }>;
}) {
  const { fonte, id } = await params;

  if (fonte !== 'camara' && fonte !== 'senado') {
    notFound();
  }

  const perfil = await getPerfilDetalhado(fonte, id);

  if (!perfil) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-surface-container py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <Link
            href="/#candidatos"
            className="inline-block font-headline font-black uppercase text-lg border-b-4 border-black"
          >
            Voltar para parlamentares
          </Link>

          <section className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)]">
              <div className="bg-surface-container-high border-b-4 lg:border-b-0 lg:border-r-4 border-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={perfil.foto_url || 'https://fakeimg.pl/640x640?text=Sem+Foto'}
                  alt={perfil.nome_urna}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <div className="p-8 lg:p-10 space-y-6">
                <div className="flex flex-wrap gap-3">
                  <span className="bg-secondary-fixed text-on-secondary-fixed border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                    {getCasaBadge(perfil)}
                  </span>
                  <span className="bg-white border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                    {getFonteBadge(perfil)}
                  </span>
                  {perfil.situacao ? (
                    <span className="bg-primary-container border-2 border-black px-3 py-1 font-headline font-black uppercase text-sm">
                      {perfil.situacao}
                    </span>
                  ) : null}
                </div>

                <div>
                  <p className="font-label font-bold uppercase text-sm opacity-70 mb-2">
                    {perfil.partido} {perfil.uf ? `• ${perfil.uf}` : ''} • {perfil.cargo}
                  </p>
                  <h1 className="font-headline font-black text-5xl md:text-7xl uppercase leading-none">
                    {perfil.nome_urna}
                  </h1>
                  <p className="font-body font-bold text-lg mt-4 max-w-3xl">
                    Página individual alimentada por dados oficiais já disponíveis no projeto. O
                    que ainda não está validado por fonte pública permanece fora do perfil.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {perfil.fatos.slice(0, 8).map((fato) => (
                    <article
                      key={`${fato.label}-${fato.value}`}
                      className="border-4 border-black p-4 bg-surface-container-low"
                    >
                      <p className="font-label font-bold uppercase text-xs opacity-70 mb-2">
                        {fato.label}
                      </p>
                      <p className="font-body font-bold">{fato.value}</p>
                      {fato.helper ? (
                        <p className="font-body text-sm mt-2 opacity-80">{fato.helper}</p>
                      ) : null}
                    </article>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {perfil.linksOficiais.slice(0, 4).map((link) => (
                    <a
                      key={`${link.label}-${link.href}`}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="font-headline font-black uppercase border-b-4 border-black"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {perfil.atualizadoEm ? (
                  <p className="font-label font-bold uppercase text-xs opacity-70">
                    Atualização informada pela fonte: {formatDate(perfil.atualizadoEm) ?? perfil.atualizadoEm}
                  </p>
                ) : null}
              </div>
            </div>
          </section>

          {renderSobreSection(perfil)}

          {renderListSection(
            'Mandato',
            'Posição atual e histórico de mandatos recuperados nas fontes oficiais.',
            perfil.mandatos,
            'Ainda não encontramos um bloco adicional de histórico para este parlamentar além do registro atual.',
          )}

          {renderListSection(
            'Atuação Legislativa',
            'Autorias recentes e votações nominais quando o serviço oficial já entrega esses dados.',
            [...perfil.autorias, ...perfil.votacoes],
            perfil.fonte === 'camara'
              ? 'A integração de proposições já está ativa, mas o bloco de votações nominais da Câmara ainda será conectado em uma próxima etapa.'
              : 'Nenhuma atuação recente foi retornada pelos serviços oficiais consultados nesta carga.',
          )}

          {renderListSection(
            'Comissões e Cargos',
            'Participações institucionais disponíveis na fonte oficial da casa legislativa correspondente.',
            [...perfil.comissoes, ...perfil.cargos],
            perfil.fonte === 'senado'
              ? 'O Senado não retornou comissões ou cargos ativos para este parlamentar nesta consulta.'
              : 'A integração de comissões e cargos da Câmara ainda será adicionada em uma próxima etapa.',
          )}

          {renderListSection(
            perfil.fonte === 'camara' ? 'Despesas Recentes' : 'Histórico Partidário',
            perfil.fonte === 'camara'
              ? 'Despesas recentes da cota parlamentar retornadas diretamente pela API oficial da Câmara.'
              : 'Filiações partidárias históricas retornadas pela API oficial do Senado.',
            perfil.fonte === 'camara' ? perfil.despesas : perfil.filiacoes,
            perfil.fonte === 'camara'
              ? 'Não houve despesas recentes retornadas pela Câmara nesta consulta.'
              : 'A API do Senado não retornou histórico partidário nesta consulta.',
          )}

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <article className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-headline font-black text-3xl uppercase mb-4">
                Fontes Desta Página
              </h2>
              <div className="space-y-3">
                {perfil.linksOficiais.map((link) => (
                  <a
                    key={`${link.label}-${link.href}-full`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="block font-headline font-black uppercase border-b-4 border-black w-max"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </article>

            <article className="bg-primary-container border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="font-headline font-black text-3xl uppercase mb-4">
                Em Integração Segura
              </h2>
              <div className="space-y-3 font-body font-bold">
                <p>TSE ainda será conciliado nesta ficha para candidaturas, bens e histórico eleitoral.</p>
                <p>CNJ continua restrito a consulta por tribunal e número do processo, sem inferência por nome.</p>
                <p>Qualquer indicador reputacional ou judicial só entra quando houver base auditável e vínculo confiável.</p>
              </div>
            </article>
          </section>

          <section className="bg-white border-4 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="font-headline font-black text-3xl uppercase mb-4">Notas Metodológicas</h2>
            <div className="space-y-3">
              {perfil.notas.map((nota) => (
                <p key={nota} className="font-body font-medium">
                  {nota}
                </p>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
