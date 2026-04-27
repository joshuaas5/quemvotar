import { NextRequest, NextResponse } from 'next/server';
import { getCnjProcessoByNumero } from '@/lib/api';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const tribunal = request.nextUrl.searchParams.get('tribunal')?.trim() ?? '';
    const numero = request.nextUrl.searchParams.get('numero')?.trim() ?? '';

    if (!tribunal || !numero) {
      return NextResponse.json(
        {
          error: 'Informe os parâmetros "tribunal" e "numero" para consultar um processo.',
        },
        { status: 400 },
      );
    }

    const processo = await getCnjProcessoByNumero(tribunal, numero);

    return NextResponse.json({
      atualizadoEm: new Date().toISOString(),
      origem: 'cnj-datajud',
      dados: processo,
    });
  } catch (error) {
    console.error('[API /fontes/cnj/processo] Error:', error);
    return NextResponse.json(
      {
        error: 'Não foi possível consultar o processo no CNJ no momento.',
        atualizadoEm: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
