import { ImageResponse } from 'next/og';
export const alt = 'Agregador de pesquisas eleitorais 2026 — QuemVotar';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default function Image() {
 return new ImageResponse(<div style={{width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',background:'#ffd709',padding:'60px',border:'12px solid #111',color:'#111',fontFamily:'sans-serif'}}><div style={{display:'flex',fontSize:34,fontWeight:700}}>QUEM VOTAR.</div><div style={{display:'flex',fontSize:70,fontWeight:700,lineHeight:1.05}}>PESQUISAS ELEITORAIS 2026</div><div style={{display:'flex',flexDirection:'column',gap:20}}><div style={{display:'flex',fontSize:34,fontWeight:700}}>Como está a corrida para presidente?</div><div style={{display:'flex',fontSize:26}}>Compare levantamentos, médias e fontes.</div></div><div style={{display:'flex',fontSize:24}}>quemvotar.com.br/pesquisas</div></div>,size);
}
