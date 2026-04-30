'use client';

import { useFavoritos } from '@/hooks/useFavoritos';
import { useToast } from '@/components/Toast';
import Icon from './Icon';

interface BotaoFavoritarProps {
  id: string;
  fonte: 'camara' | 'senado';
  nome_urna: string;
  partido: string;
  uf: string;
  cargo: string;
  foto_url?: string;
}

export default function BotaoFavoritar({ id, fonte, nome_urna, partido, uf, cargo, foto_url }: BotaoFavoritarProps) {
  const { isFavorito, toggleFavorito, loaded } = useFavoritos();
  const { showToast } = useToast();

  if (!loaded) {
    return (
      <div className="w-10 h-10 border-4 border-black bg-gray-200 animate-pulse" />
    );
  }

  const favorito = isFavorito(id, fonte);

  const handleClick = () => {
    toggleFavorito({ id, fonte, nome_urna, partido, uf, cargo, foto_url });
    showToast(
      favorito ? `Removido dos favoritos` : `Adicionado aos favoritos`,
      favorito ? 'info' : 'success'
    );
  };

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 border-4 border-black flex items-center justify-center transition-all active:scale-95 ${
        favorito
          ? 'bg-[#ff006e] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
          : 'bg-white text-black hover:bg-gray-100'
      }`}
      aria-label={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      title={favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Icon name="heart" className="w-6 h-6" />
    </button>
  );
}
