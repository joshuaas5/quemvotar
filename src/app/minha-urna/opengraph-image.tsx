import { ImageResponse } from 'next/og';
export const alt = 'Cola eleitoral2026 na ordem da urna';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#ffd709',padding:'60px',border:'12px solid #111',color:'#111',fontFamily:'sans-serif'}}><div style={{display:'flex',fontSize:34,fontWeight:700}}>QUEM VOTAR.</div><div style={{display:'flex',fontSize:70,fontWeight:700,lineHeight:1.05}}>MINHA COLA ELEITORAL</div><div style={{display:'flex',flexDirection:'column',gap:20}}><div style={{display:'flex',fontSize:34,fontWeight:700}}>Seis escolhas. Na ordem da urna.</div><div style={{display:'flex',fontSize:26}}>Monte, baixe e imprima. Grátis.</div></div><div style={{display:'flex',fontSize:24}}>quemvotar.com.br/minha-urna</div></div>,size);
}
