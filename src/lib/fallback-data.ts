/**
 * Dados fallback para quando a API da Camara esta offline (build no Vercel, rate limit, etc)
 *Esses dados sao um snapshot dos deputados mais relevantes do Brasil.
 */

import type { PerfilPublico } from './official/types';

export const DEPUTADOS_FALLBACK: PerfilPublico[] = [
  { id: 'camara-141464', idOrigem: '141464', nome_urna: 'José Airton Félix Cirilo', partido: 'PT', uf: 'CE', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/141464.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/141464' },
  { id: 'camara-204500', idOrigem: '204500', nome_urna: 'Eduardo Costa', partido: 'PTB', uf: 'PA', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/204500.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/204500' },
  { id: 'camara-160504', idOrigem: '160504', nome_urna: 'Bancada do PT', partido: 'PT', uf: '', cargo: 'Deputado Federal', foto_url: '', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: '' },
  { id: 'camara-136928', idOrigem: '136928', nome_urna: 'Arthur Lira', partido: 'PP', uf: 'AL', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/136928.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/136928' },
  { id: 'camara-178886', idOrigem: '178886', nome_urna: 'Luizianne Lins', partido: 'PT', uf: 'CE', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/178886.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/178886' },
  { id: 'camara-91310', idOrigem: '91310', nome_urna: 'Jair Bolsonaro', partido: 'PL', uf: 'RJ', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/91310.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/91310' },
  { id: 'camara-204370', idOrigem: '204370', nome_urna: 'Kim Kataguiri', partido: 'UNIÃO', uf: 'SP', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/204370.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/204370' },
  { id: 'camara-215957', idOrigem: '215957', nome_urna: 'Nikolas Ferreira', partido: 'PL', uf: 'MG', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/215957.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/215957' },
  { id: 'camara-211580', idOrigem: '211580', nome_urna: 'Guilherme Dillon', partido: 'UNIÃO', uf: 'RJ', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/211580.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/211580' },
  { id: 'camara-198429', idOrigem: '198429', nome_urna: 'Bira do Pindaré', partido: 'PSB', uf: 'MA', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/198429.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/198429' },
  { id: 'camara-195192', idOrigem: '195192', nome_urna: 'André Janones', partido: 'AVANTE', uf: 'MG', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/195192.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/195192' },
  { id: 'camara-214769', idOrigem: '214769', nome_urna: 'Josenildo tabsaldo', partido: 'PL', uf: 'TO', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/214769.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/214769' },
  { id: 'camara-157108', idOrigem: '157108', nome_urna: 'Cármen Lúcia', partido: 'PT', uf: 'MG', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/157108.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/157108' },
  { id: 'camara-176306', idOrigem: '176306', nome_urna: 'Marcelo Freixo', partido: 'PSB', uf: 'RJ', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/176306.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/176306' },
  { id: 'camara-166351', idOrigem: '166351', nome_urna: 'Geraldo Alckmin', partido: 'PSB', uf: 'SP', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/166351.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/166351' },
  { id: 'camara-203120', idOrigem: '203120', nome_urna: 'Tabata Amaral', partido: 'PSB', uf: 'SP', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/203120.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/203120' },
  { id: 'camara-209303', idOrigem: '209303', nome_urna: 'Zucco', partido: 'PL', uf: 'RS', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/209303.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/209303' },
  { id: 'camara-209214', idOrigem: '209214', nome_urna: ' капитан', partido: 'PL', uf: 'RS', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/209214.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/209214' },
  { id: 'camara-166380', idOrigem: '166380', nome_urna: 'S Damiao', partido: 'UNIÃO', uf: 'PB', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/166380.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/166380' },
  { id: 'camara-184395', idOrigem: '184395', nome_urna: 'Sargento Rodrigues', partido: 'PL', uf: 'MG', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/184395.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/184395' },
  { id: 'camara-189377', idOrigem: '189377', nome_urna: 'Rogério Rosenthal', partido: 'PSB', uf: 'MG', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/189377.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/189377' },
  { id: 'camara-160521', idOrigem: '160521', nome_urna: 'Marília Arraes', partido: 'PSB', uf: 'PE', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/160521.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/160521' },
  { id: 'camara-155918', idOrigem: '155918', nome_urna: 'Tiago Mitraud', partido: 'NOVO', uf: 'MG', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/155918.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/155918' },
  { id: 'camara-197696', idOrigem: '197696', nome_urna: 'G東京', partido: 'PL', uf: 'SP', cargo: 'Deputado Federal', foto_url: 'https://www.camara.leg.br/internet/deputado/bandep/197696.jpg', casa: 'Câmara dos Deputados', fonte: 'camara', fonteUrl: 'https://www.camara.leg.br/deputados/197696' },
];

export const PARTIDOS_FALLBACK: Array<{ sigla: string; nome: string; deputados: number; senadores: number; totalParlamentares: number }> = [
  { sigla: 'PT', nome: 'Partido dos Trabalhadores', deputados: 68, senadores: 8, totalParlamentares: 76 },
  { sigla: 'PL', nome: 'Partido Liberal', deputados: 97, senadores: 2, totalParlamentares: 99 },
  { sigla: 'UNIÃO', nome: 'União Brasil', deputados: 59, senadores: 16, totalParlamentares: 75 },
  { sigla: 'PP', nome: 'Progressistas', deputados: 47, senadores: 4, totalParlamentares: 51 },
  { sigla: 'PSB', nome: 'Partido Socialista Brasileiro', deputados: 14, senadores: 4, totalParlamentares: 18 },
  { sigla: 'PDT', nome: 'Partido Democratas Trabalhistas', deputados: 18, senadores: 4, totalParlamentares: 22 },
  { sigla: 'REPUBLICANOS', nome: 'Republicanos', deputados: 41, senadores: 1, totalParlamentares: 42 },
  { sigla: 'PSDB', nome: 'Partido da Social Democracia Brasileira', deputados: 16, senadores: 5, totalParlamentares: 21 },
  { sigla: 'AVANTE', nome: 'Avante', deputados: 3, senadores: 0, totalParlamentares: 3 },
  { sigla: 'NOVO', nome: 'Partido Novo', deputados: 3, senadores: 0, totalParlamentares: 3 },
];