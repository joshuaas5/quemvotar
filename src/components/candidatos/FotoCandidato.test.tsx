import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { FotoCandidato } from './FotoCandidato';

afterEach(cleanup);

const candidate = { sqEleicao: 20322002026, id: 280002552484, uf: 'BR', nome: 'Clariana Barão' };

describe('FotoCandidato', () => {
  it('usa a fonte oficial direta quando o proxy do site falha', () => {
    render(<FotoCandidato {...candidate} />);
    expect(screen.getByRole('img').getAttribute('src')).toContain('/api/fontes/tse/foto?');
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('img').getAttribute('src')).toBe('https://divulgacandcontas.tse.jus.br/divulga/rest/arquivo/img/20322002026/280002552484/BR');
    fireEvent.error(screen.getByRole('img'));
    expect(screen.queryByRole('img')).toBeNull();
    expect(screen.getByText('CB')).toBeTruthy();
  });

  it('reinicia as fontes quando um candidato substitui outro na mesma posição', () => {
    const view = render(<FotoCandidato {...candidate} />);
    fireEvent.error(screen.getByRole('img'));
    fireEvent.error(screen.getByRole('img'));
    view.rerender(<FotoCandidato {...candidate} id={280002551975} nome="Edmilson Costa" />);
    expect(screen.getByRole('img').getAttribute('src')).toContain('id=280002551975');
  });

  it('preserva a foto parlamentar e tenta ambas as fontes TSE se ela falhar', () => {
    render(<FotoCandidato {...candidate} fotoAlta="https://www.camara.leg.br/foto.jpg" />);
    expect(screen.getByRole('img').getAttribute('src')).toBe('https://www.camara.leg.br/foto.jpg');
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('img').getAttribute('src')).toContain('/api/fontes/tse/foto?');
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByRole('img').getAttribute('src')).toContain('https://divulgacandcontas.tse.jus.br/');
  });
});
