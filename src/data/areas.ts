// Áreas dos cursos. Cada área tem um gradiente (usado enquanto não houver foto)
// e, opcionalmente, uma foto em src/assets/areas/<area>.jpg.

export type Area =
  | 'gestao' | 'financas' | 'pessoas' | 'marketing' | 'logistica'
  | 'saude' | 'beleza' | 'esporte'
  | 'educacao' | 'idiomas'
  | 'tecnologia' | 'juridico' | 'seguranca'
  | 'imoveis' | 'turismo' | 'design' | 'aviacao' | 'ambiente' | 'fe';

export const areas: Record<Area, { nome: string; grad: [string, string] }> = {
  gestao:     { nome: 'Gestão e negócios',   grad: ['#6411E8', '#2A0A6B'] },
  financas:   { nome: 'Finanças',            grad: ['#4C2BD0', '#160B3D'] },
  pessoas:    { nome: 'Pessoas e RH',        grad: ['#A37BFF', '#2A0A6B'] },
  marketing:  { nome: 'Marketing e vendas',  grad: ['#A855F7', '#3B0F6E'] },
  logistica:  { nome: 'Logística',           grad: ['#3B2A8C', '#140A3A'] },
  saude:      { nome: 'Saúde',               grad: ['#0E9F8F', '#0B3B44'] },
  beleza:     { nome: 'Beleza e estética',   grad: ['#C2569B', '#4A1340'] },
  esporte:    { nome: 'Esporte',             grad: ['#1F8F5F', '#0D3A2A'] },
  educacao:   { nome: 'Educação',            grad: ['#6411E8', '#0D0820'] },
  idiomas:    { nome: 'Letras e idiomas',    grad: ['#5B4CC4', '#1E1650'] },
  tecnologia: { nome: 'Tecnologia',          grad: ['#2F3BD8', '#0D1240'] },
  juridico:   { nome: 'Jurídico',            grad: ['#2A2342', '#5B4A9A'] },
  seguranca:  { nome: 'Segurança',           grad: ['#24324F', '#0C1324'] },
  imoveis:    { nome: 'Mercado imobiliário', grad: ['#6411E8', '#0F3A5A'] },
  turismo:    { nome: 'Turismo',             grad: ['#0BA5A0', '#06363A'] },
  design:     { nome: 'Design',              grad: ['#B0682F', '#3D1F0C'] },
  aviacao:    { nome: 'Aviação',             grad: ['#2C6FD6', '#0A2347'] },
  ambiente:   { nome: 'Meio ambiente',       grad: ['#2E8B57', '#0F3322'] },
  fe:         { nome: 'Teologia',            grad: ['#7A5AC8', '#2A1B4A'] },
};
