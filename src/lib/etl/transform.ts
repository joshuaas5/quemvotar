export type CamaraApiVote = {
  codProposicao: number | string;
  objVotacao: string;
  voto: string;
  dataVotacao: string;
}

export type DbVote = {
  candidato_id: string;
  id_proposicao: string;
  tema_simplificado: string;
  voto: string;
  data_votacao: string | null;
}

export function transformaVotoCamaraParaDB(candidatoId: string, apiData: CamaraApiVote): DbVote {
  // Normaliza votos "Não" "Não " "nao"
  let parsedVote = apiData.voto.toUpperCase().trim();
  if (parsedVote.includes('NÃO') || parsedVote.includes('NÃƒO') || parsedVote === 'NAO') {
    parsedVote = 'NAO';
  } else if (parsedVote.includes('SIM')) {
    parsedVote = 'SIM';
  } else if (parsedVote.includes('ABSTENÇÃO') || parsedVote.includes('ABSTENCAO')) {
    parsedVote = 'ABSTENCAO';
  }

  // Extrai data
  let parsedDate = null;
  try {
    if (apiData.dataVotacao !== '---') { // Algumas APIs podem não ter data perfeita
       parsedDate = new Date(apiData.dataVotacao).toISOString();
    }
  } catch(e) { /* ignore */ }

  return {
    candidato_id: candidatoId,
    id_proposicao: String(apiData.codProposicao),
    tema_simplificado: apiData.objVotacao,
    voto: parsedVote,
    data_votacao: parsedDate
  };
}
