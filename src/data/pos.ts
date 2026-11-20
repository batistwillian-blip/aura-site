// Pós-graduações EAD UNIFAEL (Pós Digital), polo Balneário Camboriú.
//
// Valores: src/data/pos-unifael.csv (gerado por `node scripts/atualizar-pos.mjs <csv do simulador>`).
//   Mudam todo mês: atualize o CSV e faça um novo deploy.
// Conteúdo (sobre, objetivos, disciplinas, público): src/data/pos-conteudo.json,
//   levantado do catálogo público da pós UNIFAEL em 11/2026.
// Regra: o site NUNCA linka para páginas de matrícula das parceiras. Todo contato vai direto para o WhatsApp.

import type { Area } from './areas';
import type { Curso } from './cursos';
import tabela from './pos-unifael.csv?raw';
import conteudoJson from './pos-conteudo.json';

interface Conteudo { sobre?: string[]; objetivo?: string; aprende?: string[]; disciplinas?: string[]; paraQuem?: string; similar?: string }
const conteudo = conteudoJson as Record<string, Conteudo>;

// ---------- nomes ----------
const minusculas = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'na', 'no', 'nas', 'nos', 'a', 'à', 'ao', 'aos', 'com', 'para', 'o', 'as', 'os', 'entre']);
const especiais: Record<string, string> = {
  ti: 'TI', iot: 'IoT', ubs: 'UBS', lgpd: 'LGPD', devops: 'DevOps', ux: 'UX', mba: 'MBA', ens: 'Ens.', 'ens.': 'Ens.',
};

function titulo(s: string): string {
  const limpo = s.replace(/\s+-\s+(?=RACIAL)/i, '-').replace(/\s+/g, ' ').trim().toLowerCase();
  let inicio = true;
  return limpo
    .split(' ')
    .map((w) => {
      const pre = w.match(/^\(/) ? '(' : '';
      const core = w.replace(/^\(/, '');
      const chave = core.replace(/[:,)]$/, '');
      const suf = core.slice(chave.length);
      let out: string;
      if (especiais[chave]) out = especiais[chave];
      else if (!inicio && minusculas.has(chave)) out = chave;
      else out = chave.split('-').map((p) => (especiais[p] ? especiais[p] : p.charAt(0).toUpperCase() + p.slice(1))).join('-');
      inicio = /:$/.test(core);
      return pre + out + suf;
    })
    .join(' ')
    .replace(/ - /g, ': ');
}

export const slugify = (s: string) =>
  s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// ---------- áreas (para foto, filtro e textos) ----------
const regras: [Area, RegExp][] = [
  ['fe', /teolog/],
  ['beleza', /estetic|cosmetolog|podolog/],
  ['esporte', /esport|fitness|wellness/],
  ['tecnologia', /software|sistemas|dados|data science|cloud|nuvem|devops|inteligencia artificial|ciberseguranca|seguranca ciber|seguranca digital|digital security|seguranca da informacao|\biot\b|internet das coisas|\bti\b|lean it|tecnolog|informatic|big data|\bux\b|user experience|recrutamento tech|tech recruiter|data protection|lgpd|compliance digital|transformacao digital|automacao|gestao 4\.0/],
  ['saude', /saude|enfermag|farmac|nutri|fisioterap|psicologia clinica|psicologia hospitalar|psicologia social|psicomotric|microbiolog|epidemiolog|geriatr|gerontolog|idoso|hospitalar|oncolog|fitoterap/],
  ['juridico', /direito|juridic|legislacao|eleitoral/],
  ['seguranca', /seguranca publica/],
  ['design', /interiores|arquitetura|design/],
  ['ambiente', /ambient|saneamento|sustentav/],
  ['financas', /contab|auditoria e (controle|pericia)|auditoria e controladoria|controladoria|pericia|financ/],
  ['pessoas', /pessoas|departamento pessoal|recursos humanos|coaching|talentos|trabalhist|psicologia (organizacional|nas organizacoes)|lideranca/],
  ['marketing', /marketing|influenc|midias|comunicacao|publicidade|vendas|comercial/],
  ['logistica', /logistic/],
  ['educacao', /educa|ensino|docencia|pedagog|alfabetiz|letramento|escolar|ludicidade|metodolog|didatica|antropolog|filosofia|aulas on-line|neuroeduca/],
  ['idiomas', /lingua portuguesa|redacao/],
];
const areaDe = (nome: string): Area => {
  const n = slugify(nome).replace(/-/g, ' ');
  return regras.find(([, re]) => re.test(n))?.[0] ?? 'gestao';
};

// ---------- textos de apoio quando o catálogo não traz o conteúdo ----------
const publicoPorArea: Partial<Record<Area, string>> = {
  educacao: 'Professores, pedagogos, coordenadores e demais graduados que atuam ou querem atuar na educação.',
  saude: 'Profissionais graduados da área da saúde que querem se especializar e ampliar a atuação.',
  tecnologia: 'Profissionais graduados de tecnologia e de outras áreas que querem atuar com TI.',
  juridico: 'Bacharéis em Direito e profissionais graduados que lidam com temas jurídicos no dia a dia.',
  financas: 'Contadores, administradores, economistas e graduados que atuam com finanças e controle.',
  pessoas: 'Gestores, profissionais de RH e líderes de equipe com graduação concluída.',
  marketing: 'Profissionais graduados de comunicação, vendas, marketing e empreendedores.',
};

// Primeira frase (ou até ~220 caracteres) para o subtítulo e a meta description.
function primeiraFrase(s: string): string {
  const m = s.match(/^.{60,}?[.!?](?=\s|$)/);
  const f = m ? m[0] : s;
  return f.length <= 230 ? f : f.slice(0, 220).replace(/\s+\S*$/, '') + '…';
}

// ---------- tabela ----------
export interface Preco { parcelas: number; boleto: string; cartao: string; vigencia: string }

const linhas = tabela.replace(/^﻿/, '').split(/\r?\n/).filter((l) => l.trim()).slice(1);

export const vigenciaPos = linhas[0]?.split(';')[6] ?? '';
const meses = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
export const vigenciaPosTexto = (() => {
  const [m, a] = vigenciaPos.split('/');
  return m && a ? `${meses[Number(m) - 1]} de ${a}` : vigenciaPos;
})();

export const pos: Curso[] = linhas.map((l) => {
  const [orig, , dur, parc, boleto, cartao, vig] = l.split(';').map((x) => x.trim());
  const mba = /^MBA\b/i.test(orig);
  const nome = titulo(orig);
  const curto = nome.replace(/^(Especialização (em|na)|MBA em)\s+/i, '');
  const slug = slugify(nome);
  const area = areaDe(curto);
  const c = conteudo[orig] ?? {};
  const sobre = c.sobre?.filter(Boolean) ?? [];
  const base = c.objetivo || sobre[0];
  const resumo = base ? primeiraFrase(base) : `${mba ? 'MBA' : 'Especialização'} 100% online da UNIFAEL em ${curto}, para você se especializar e crescer na carreira.`;
  return {
    slug,
    nome,
    nomeCurto: curto,
    nivel: 'pos-graduacao',
    categoria: mba ? 'MBA' : 'Especialização',
    parceira: 'unifael',
    duracao: `${dur} meses`,
    modalidade: '100% online',
    area,
    resumo,
    sobre,
    paraQuem: c.paraQuem || publicoPorArea[area] || 'Profissionais com graduação concluída (bacharelado, licenciatura ou tecnólogo) que querem se especializar.',
    objetivo: c.objetivo || undefined,
    aprende: c.aprende?.length ? c.aprende : undefined,
    disciplinas: c.disciplinas?.length ? c.disciplinas : undefined,
    preco: { parcelas: Number(parc), boleto, cartao, vigencia: vig },
    meses: Number(dur),
    similarNome: c.similar,
  } satisfies Curso & { similarNome?: string };
});

// Versão "irmã" (mesmas disciplinas, outra duração), quando o catálogo indica.
const porSlug = new Map(pos.map((p) => [p.slug, p]));
for (const p of pos as (Curso & { similarNome?: string })[]) {
  if (p.similarNome) {
    const alvo = porSlug.get(slugify(titulo(p.similarNome)));
    if (alvo && alvo.slug !== p.slug) {
      p.versao = alvo.slug;
      alvo.versao ??= p.slug; // vale nos dois sentidos
    }
  }
  delete p.similarNome;
}

// Garante slugs únicos (o build falha se houver repetição).
const vistos = new Set<string>();
for (const p of pos) {
  if (vistos.has(p.slug)) throw new Error(`Slug de pós repetido: ${p.slug}`);
  vistos.add(p.slug);
}
