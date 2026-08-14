/**
 * Identidade publica do QuemVotar (Fase 2 do plano de correcao AdSense).
 *
 * Este arquivo centraliza os dados de identificacao exigidos para conteudo
 * YMYL. Projeto sem pessoa juridica: publicacao responsavel e a Equipe
 * QuemVotar, em Santa Catarina (Brasil).
 */

export const SITE = {
  name: 'QuemVotar',
  domain: 'quemvotar.com.br',
  url: 'https://www.quemvotar.com.br',

  /** Responsavel pela publicacao (sem pessoa juridica registrada). */
  publisherName: 'Equipe QuemVotar',
  /** Sem CNPJ: projeto editorial independente, sem pessoa juridica. */
  publisherCnpj: '',

  /** Responsavel editorial: equipe do projeto (sem pessoa fisica declarada). */
  responsibleName: 'Equipe Editorial do QuemVotar',
  responsibleCredential:
    'Projeto editorial independente de dados p\u00fablicos sobre o Congresso Nacional.',
  responsibleCityUf: 'Santa Catarina, Brasil',

  /**
   * E-mail de contato escolhido pela equipe. Atencao: para o AdSense, um
   * endereco no dominio (ex.: contato@quemvotar.com.br) fortalece a identidade
   * YMYL; o Gmail atual e aceitavel, mas mais fraco como sinal.
   */
  contactEmail: 'contatoquemvotar@gmail.com',

  address: 'Santa Catarina, Brasil',

  /** Data de criacao do projeto (usada na linha do tempo do /sobre). */
  foundedAt: '2026',
} as const;
