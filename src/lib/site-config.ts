/**
 * Identidade publica do QuemVotar (Fase 2 do plano de correcao AdSense).
 *
 * IMPORTANTE: este arquivo centraliza os dados de identificacao exigidos pelo
 * Google para conteudo YMYL. Nenhum campo pode conter informacao inventada.
 * Os campos marcados com TODO precisam ser confirmados pelo responsavel antes
 * da publicacao (o site so deve pedir revisao ao AdSense com estes dados reais).
 */

export const SITE = {
  name: 'QuemVotar',
  domain: 'quemvotar.com.br',
  url: 'https://www.quemvotar.com.br',

  /** Editora responsavel pelo site (confirmar razao social exata). */
  publisherName: 'Editora V\u00e9los',
  /** TODO: preencher CNPJ real da editora. */
  publisherCnpj: '',

  /** TODO: preencher nome completo da pessoa responsavel pela publicacao. */
  responsibleName: '',
  /** TODO: preencher credencial verdadeira (formacao/experiencia). */
  responsibleCredential: '',
  /** TODO: preencher cidade e UF. */
  responsibleCityUf: '',

  /** E-mail no dominio (exige caixa de correio ativa em quemvotar.com.br). */
  contactEmail: 'contato@quemvotar.com.br',

  /** TODO: preencher endereco completo para a pagina de contato/sobre. */
  address: '',

  /** Data de criacao do projeto (usada na linha do tempo do /sobre). */
  foundedAt: '2026',
} as const;
