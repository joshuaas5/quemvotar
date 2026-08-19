/* Aviso de transparência sobre a fonte oficial dos dados de candidaturas. */
export function AvisoFonteTse() {
  return (
    <aside className="bg-sky-50 border-4 border-sky-700 p-4 md:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <p className="font-headline font-black uppercase text-xs md:text-sm mb-2">ℹ️ Fonte oficial e atualização dos dados</p>
      <p className="font-body font-medium text-xs md:text-sm leading-relaxed">
        Todas as informações de candidaturas desta página são importadas <strong>diretamente e em tempo real da API
        oficial do Tribunal Superior Eleitoral (TSE)</strong> — o mesmo banco de dados usado na divulgação oficial das
        eleições, atualizado automaticamente a cada hora.
      </p>
      <p className="font-body font-medium text-xs md:text-sm leading-relaxed mt-2">
        Por isso, quando os servidores do TSE estão instáveis ou em manutenção — comum em períodos eleitorais — o site
        pode apresentar lentidão, fotos ou dados ausentes e indisponibilidade temporária. <strong>Esse comportamento não é
        um problema do QuemVotar</strong>: assim que o TSE estabiliza, tudo volta ao normal automaticamente, sem nenhuma ação.
      </p>
      <p className="font-label font-bold uppercase text-[10px] mt-2 opacity-70">
        Fonte: TSE — Divulgação de Candidaturas e Contas Eleitorais · divulgacandcontas.tse.jus.br
      </p>
    </aside>
  );
}
