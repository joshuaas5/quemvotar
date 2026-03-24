import { supabase } from './supabase';

export interface Candidato {
  id: string;
  id_tse?: string;
  nome_urna: string;
  partido: string;
  uf?: string;
  cargo: string;
  foto_url: string;
  status_ficha_limpa: boolean;
  num_processos_stf: number;
}

// Fallback mocks just in case Supabase credentials aren't set yet
const MOCK_CANDIDATOS: Candidato[] = [
  {
    id: "1",
    nome_urna: "RICARDO SILVA",
    partido: "PP",
    uf: "SP",
    cargo: "Deputado Federal",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB0RTBhIuL73RZO-BM7n7eKYXzgkpeCY1Uv6XzvVQSSF9sbnHXqoUgt-iet0H6AAXvrcE--QMvkT-S-cuaBWhc8zwaSAxR0fIWSdECj05nprfZGDatelLBZr_bMCegNO2PZPX4lMh1g7L0E1si5mGeYtQamCliAFZ_NCcgMnOG8_0Gcrg7n5BRv4BC6rMyQ41jL2OYjNaKsSd2X9q7RWbXtqyxDee-lsQKyjOF_HUTQUYoD8L2sJFuFji0_qVwvIK5QTYc5v5SQTcs",
    status_ficha_limpa: false,
    num_processos_stf: 4
  },
  {
    id: "2",
    nome_urna: "ANA COSTA",
    partido: "MV",
    uf: "RJ",
    cargo: "Deputada Federal",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuALIUBJXR9xXBUQXPhEzbYYq8REjp55vscPhlSAztisqFrN0BMm6T5c58X5SfXj6ltElp-NtzPQ76qdO5AyF0WvPcMY1z9-AOC70D7p9RWQF4lJBmZE3jXDxMSXoHCqoAHux8HQZ3u0HHCvbe7vV6uJmxa3_CyMwZGTDdIvaLpmkElGqMylCo_IsACfrjQVnR0cthCGPRyLdTS60cgsh0Q2IAUFvaLseI2mGTuW-nd-xA03kac8Q9kOOa1k0tEFfIDRw_lA5O73WPc",
    status_ficha_limpa: true,
    num_processos_stf: 0
  },
  {
    id: "3",
    nome_urna: "MARCOS OLIVEIRA",
    partido: "PJ",
    uf: "MG",
    cargo: "Deputado Federal",
    foto_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGvkE-Prc1h6QQp5g1jDEe-olHkLiCITHKZcBpqM_f0GXJwYINjdt7XVZ5A1FMfEwzlg7XWo0O3x_pyeLuJlP-vnS81Cc1hZZURfCthJKQyu1TJzYaZRrNejazHd7E-jurKrlgDPuGpNngPn4t1nux3AfsgW0uc4NzkJHHtC1OYi1A9Tv3_XeZXQ6Va7sl5w9USFSS_o2G-yg5yxlOge0--CWmPq_bQtGdN6LEqcJPBnTfYwaiILjIg0z7tYH7vyCL8tIy9qDUzu8",
    status_ficha_limpa: true,
    num_processos_stf: 0
  }
];

export async function getHighlights(): Promise<Candidato[]> {
  try {
    const { data, error } = await supabase
      .from('candidatos')
      .select('*')
      .order('indice_atuacao', { ascending: false })
      .limit(3);

    if (error) throw error;
    if (data && data.length > 0) return data as Candidato[];
    
    // Se o banco estiver vazio, retorna os mocks
    return MOCK_CANDIDATOS;
  } catch (error) {
    console.error("Erro ao buscar base de dados, utilizando fallback estático:", error);
    return MOCK_CANDIDATOS;
  }
}

export async function searchCandidatos(query: string): Promise<Candidato[]> {
  if (!query) return [];
  try {
    const { data, error } = await supabase
      .from('candidatos')
      .select('*')
      .ilike('nome_urna', `%${query}%`)
      .limit(10);
      
    if (error) throw error;
    return (data || []) as Candidato[];
  } catch (error) {
    console.error("Erro na busca:", error);
    // Filtragem local no mock para garantir funcionamento sem o banco
    return MOCK_CANDIDATOS.filter(c => c.nome_urna.toLowerCase().includes(query.toLowerCase()));
  }
}
