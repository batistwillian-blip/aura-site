// Catálogo de níveis e cursos. Para adicionar um curso, inclua um item em `cursos`:
// a página /cursos/<slug>/ é gerada automaticamente.
// Dados públicos das parceiras, levantados em 11/2026. Confirmar valores e condições antes de anunciar.
// Regra: o site NUNCA linka para páginas de matrícula das parceiras. Todo contato vai direto para o WhatsApp.

import type { Area } from './areas';
import { graduacao } from './graduacao';

export type NivelId = 'eja-e-tecnicos' | 'graduacao' | 'pos-graduacao' | 'mestrado';
export type ParceiraId = 'cefe' | 'unifael' | 'agtu';

export interface Nivel {
  id: NivelId;
  titulo: string;
  momento: string;
  chamada: string;
  descricao: string;
  parceira: ParceiraId;
  pontos: string[];
  faq: { p: string; r: string }[];
}

export interface Curso {
  slug: string;
  nome: string;
  nivel: NivelId;
  categoria: string;
  parceira: ParceiraId;
  duracao: string;
  modalidade: string;
  cargaHoraria?: string;
  grau?: string;
  area: Area;
  resumo: string;
  paraQuem: string;
  /** O que o aluno aprende (técnicos, EJA, mestrados). */
  aprende?: string[];
  /** Onde pode atuar depois de formado (graduações). */
  mercado?: string[];
  destaqueBC?: boolean;
}

export const parceiras: Record<ParceiraId, { nome: string; papel: string; descricao: string; selo: string }> = {
  cefe: {
    nome: 'CEFE Educa',
    papel: 'EJA, técnicos e profissionalizantes',
    descricao: 'Centro de Ensino Floripa: supletivo, cursos técnicos e profissionalizantes 100% online.',
    selo: 'Certificado emitido por CEFE Educa',
  },
  unifael: {
    nome: 'UNIFAEL',
    papel: 'Graduação e pós-graduação',
    descricao: 'Centro Universitário com mais de 600 polos no Brasil. A AURA é o polo oficial em Balneário Camboriú.',
    selo: 'Diploma emitido pela UNIFAEL',
  },
  agtu: {
    nome: 'AGTU',
    papel: 'Mestrados internacionais',
    descricao: 'American Global Tech University, de Orlando (EUA). Mestrados online e em português.',
    selo: 'Diploma emitido pela AGTU (EUA)',
  },
};

export const avisoMestrado =
  'Os mestrados da AGTU são títulos estrangeiros. Para ter validade legal no Brasil, o diploma precisa passar por um processo de reconhecimento em uma universidade brasileira, que não é garantido pela AGTU nem pela AURA. Nossa equipe explica o processo antes da matrícula.';

export const niveis: Nivel[] = [
  {
    id: 'eja-e-tecnicos',
    titulo: 'EJA e Técnicos',
    momento: 'Quero terminar os estudos ou ter uma profissão rápida',
    chamada: 'Termine seus estudos e conquiste uma profissão',
    descricao:
      'Conclua o ensino fundamental ou médio no seu ritmo e faça um curso técnico 100% online, com formação a partir de 7 meses.',
    parceira: 'cefe',
    pontos: [
      'EJA Fundamental a partir de 15 anos e EJA Médio a partir de 18 anos',
      'Técnicos 100% online, com apostilas e videoaulas 24h',
      'Aproveitamento de disciplinas já cursadas',
      'Certificado digital com consulta online',
    ],
    faq: [
      { p: 'Qual a idade mínima para o EJA?', r: 'Ensino fundamental: 15 anos completos no mês da matrícula. Ensino médio: 18 anos completos.' },
      { p: 'Posso fazer um técnico sem ter terminado o ensino médio?', r: 'Sim, se você já concluiu o ensino médio ou está cursando a partir do 2º semestre do 3º ano.' },
      { p: 'Como funcionam as aulas?', r: 'O conteúdo fica disponível 24h no ambiente virtual. Você estuda pelo celular ou computador, no seu ritmo.' },
    ],
  },
  {
    id: 'graduacao',
    titulo: 'Graduação',
    momento: 'Quero minha graduação',
    chamada: 'Sua faculdade com polo aqui em Balneário Camboriú',
    descricao:
      'Graduação EAD e semipresencial da UNIFAEL, com atendimento, matrícula e acompanhamento no nosso polo em BC.',
    parceira: 'unifael',
    pontos: [
      '39 cursos: bacharelados, licenciaturas e tecnólogos',
      'Ingresso por vestibular online, nota do ENEM, transferência ou segunda graduação',
      'Estude no seu horário, com apoio do polo',
      'Diploma da UNIFAEL, centro universitário credenciado pelo MEC',
    ],
    faq: [
      { p: 'Como faço para entrar?', r: 'Pelo vestibular online, com a nota do ENEM dos últimos 5 anos, por transferência ou como portador de diploma.' },
      { p: 'Qual a diferença entre EAD e semipresencial?', r: 'No EAD você estuda online. No semipresencial, parte das atividades é presencial no polo.' },
      { p: 'Quanto custa?', r: 'Os valores mudam por curso e por campanha. Fale com a Aurora no WhatsApp para ver as condições do momento.' },
    ],
  },
  {
    id: 'pos-graduacao',
    titulo: 'Pós-graduação',
    momento: 'Quero me especializar',
    chamada: 'Especialize-se e cresça na carreira',
    descricao:
      'Pós-graduação EAD da UNIFAEL em diversas áreas, para quem já tem diploma de graduação e quer se destacar.',
    parceira: 'unifael',
    pontos: [
      'Cursos 100% online em várias áreas',
      'Ideal para crescer na carreira ou mudar de área',
      'Ingresso simples para quem já tem graduação',
      'Certificado da UNIFAEL',
    ],
    faq: [
      { p: 'Quem pode fazer pós-graduação?', r: 'Quem já concluiu um curso de graduação (bacharelado, licenciatura ou tecnólogo).' },
      { p: 'Quais áreas estão disponíveis?', r: 'Educação, gestão, saúde, tecnologia e outras. A Aurora mostra a lista completa no WhatsApp.' },
    ],
  },
  {
    id: 'mestrado',
    titulo: 'Mestrado',
    momento: 'Quero um mestrado internacional',
    chamada: 'Mestrado internacional, online e em português',
    descricao:
      'Mestrados da American Global Tech University (EUA), com aulas e materiais em português e conclusão em até 24 meses.',
    parceira: 'agtu',
    pontos: [
      '8 programas: Business e IA, Inteligência Artificial, Cybersecurity, Direito e mais',
      '100% online, com aulas ao vivo e gravadas',
      'Aulas e materiais em português',
      'Requisito: graduação concluída',
    ],
    faq: [
      { p: 'O diploma vale no Brasil?', r: avisoMestrado },
      { p: 'Quem pode se inscrever?', r: 'Quem tem graduação concluída em instituição reconhecida. Alguns programas podem pedir documentos adicionais.' },
    ],
  },
];

type CursoBase = Omit<Curso, 'area'> & { area?: Area };

const areaPorSlug: Record<string, Area> = {
  'eja-ensino-fundamental': 'educacao',
  'eja-ensino-medio': 'educacao',
  'tecnico-em-transacoes-imobiliarias': 'imoveis',
  'tecnico-em-guia-de-turismo': 'turismo',
  'tecnico-em-design-de-interiores': 'design',
  'tecnico-em-marketing': 'marketing',
  'tecnico-em-logistica': 'logistica',
  'tecnico-em-recursos-humanos': 'pessoas',
  'mestrado-business-e-ia': 'tecnologia',
  'mestrado-inteligencia-artificial': 'tecnologia',
  'mestrado-tecnologias-digitais': 'tecnologia',
  'mestrado-cybersecurity': 'tecnologia',
  'mestrado-business-e-esg': 'ambiente',
  'mestrado-educacao-e-sustentabilidade': 'educacao',
  'mestrado-gestao-de-saude': 'saude',
  'mestrado-direito': 'juridico',
};

const outros: CursoBase[] = [
  // ---------- EJA (CEFE) ----------
  {
    slug: 'eja-ensino-fundamental', nome: 'EJA Ensino Fundamental', nivel: 'eja-e-tecnicos', categoria: 'EJA', parceira: 'cefe',
    duracao: 'Consulte', modalidade: 'Online',
    resumo: 'Conclua o ensino fundamental com uma metodologia flexível, voltada para jovens e adultos que querem retomar os estudos.',
    paraQuem: 'Jovens a partir de 15 anos e adultos que não concluíram o ensino fundamental.',
    aprende: ['Português e Matemática', 'Ciências, História e Geografia', 'Estudo no seu ritmo, pelo celular'],
  },
  {
    slug: 'eja-ensino-medio', nome: 'EJA Ensino Médio', nivel: 'eja-e-tecnicos', categoria: 'EJA', parceira: 'cefe',
    duracao: 'Consulte', modalidade: 'Online',
    resumo: 'Finalize o ensino médio de forma acessível e flexível e abra portas para o mercado de trabalho, cursos técnicos, concursos e faculdade.',
    paraQuem: 'Pessoas a partir de 18 anos que não concluíram o ensino médio.',
    aprende: ['Linguagens, Matemática e Ciências', 'Preparação para cursos técnicos e faculdade', 'Opção de Reclassificação Fast'],
  },
  // ---------- Técnicos (CEFE) ----------
  {
    slug: 'tecnico-em-transacoes-imobiliarias', nome: 'Técnico em Transações Imobiliárias (TTI)', nivel: 'eja-e-tecnicos', categoria: 'Técnico', parceira: 'cefe',
    duracao: '7 meses', modalidade: '100% online', cargaHoraria: '1.040h', destaqueBC: true,
    resumo: 'Prepare-se para atuar no mercado imobiliário com conhecimento técnico, jurídico e comercial. É a formação para quem quer se tornar corretor de imóveis.',
    paraQuem: 'Quem quer trabalhar como corretor no mercado imobiliário de Balneário Camboriú e região.',
    aprende: ['Legislação e documentação imobiliária', 'Técnicas de venda e negociação', 'Avaliação e marketing de imóveis', 'Base para o registro no CRECI'],
  },
  {
    slug: 'tecnico-em-guia-de-turismo', nome: 'Técnico em Guia de Turismo', nivel: 'eja-e-tecnicos', categoria: 'Técnico', parceira: 'cefe',
    duracao: '7 meses', modalidade: '100% online', cargaHoraria: '1.056h', destaqueBC: true,
    resumo: 'Transforme sua paixão por viagens em profissão. O curso capacita para organizar, acompanhar e conduzir grupos de turistas.',
    paraQuem: 'Quem quer trabalhar com turismo no litoral catarinense, um dos destinos mais procurados do país.',
    aprende: ['Roteiros e condução de grupos', 'Patrimônio histórico e cultural', 'Atendimento ao turista', 'Base para o cadastro no Cadastur'],
  },
  {
    slug: 'tecnico-em-design-de-interiores', nome: 'Técnico em Design de Interiores', nivel: 'eja-e-tecnicos', categoria: 'Técnico', parceira: 'cefe',
    duracao: '8 meses', modalidade: '100% online', cargaHoraria: '1.210h', destaqueBC: true,
    resumo: 'Crie ambientes funcionais, confortáveis e bonitos. O curso desenvolve competências para projetos residenciais e comerciais.',
    paraQuem: 'Quem quer atuar com projetos de interiores, decoração e reformas.',
    aprende: ['Desenho e representação de projetos', 'Materiais, cores e iluminação', 'Ergonomia e conforto', 'Atendimento ao cliente'],
  },
  {
    slug: 'tecnico-em-marketing', nome: 'Técnico em Marketing', nivel: 'eja-e-tecnicos', categoria: 'Técnico', parceira: 'cefe',
    duracao: '7 meses', modalidade: '100% online', cargaHoraria: '999h',
    resumo: 'Aprenda a criar estratégias que conectam marcas e consumidores, com comunicação e marketing digital.',
    paraQuem: 'Quem quer trabalhar com vendas, redes sociais e comunicação de empresas.',
    aprende: ['Marketing digital e redes sociais', 'Pesquisa de mercado', 'Comunicação e branding', 'Planejamento de campanhas'],
  },
  {
    slug: 'tecnico-em-logistica', nome: 'Técnico em Logística', nivel: 'eja-e-tecnicos', categoria: 'Técnico', parceira: 'cefe',
    duracao: '7 meses', modalidade: '100% online', cargaHoraria: '926h',
    resumo: 'Atue numa das áreas mais estratégicas das empresas, planejando, controlando e otimizando operações.',
    paraQuem: 'Quem quer trabalhar em portos, transportadoras, centros de distribuição e indústrias, como no polo logístico de Itajaí.',
    aprende: ['Gestão de estoques e armazenagem', 'Transporte e distribuição', 'Compras e suprimentos', 'Indicadores logísticos'],
  },
  {
    slug: 'tecnico-em-recursos-humanos', nome: 'Técnico em Recursos Humanos', nivel: 'eja-e-tecnicos', categoria: 'Técnico', parceira: 'cefe',
    duracao: '7 meses', modalidade: '100% online', cargaHoraria: '848h',
    resumo: 'Forme-se para atuar na gestão do maior patrimônio das organizações: as pessoas.',
    paraQuem: 'Quem quer trabalhar com recrutamento, departamento pessoal e desenvolvimento de equipes.',
    aprende: ['Recrutamento e seleção', 'Rotinas de departamento pessoal', 'Treinamento e desenvolvimento', 'Legislação trabalhista básica'],
  },
  // ---------- Mestrado (AGTU) ----------
  {
    slug: 'mestrado-business-e-ia', nome: 'Mestrado em Business e IA', nivel: 'mestrado', categoria: 'Mestrado', parceira: 'agtu',
    duracao: 'até 24 meses', modalidade: 'Online, em português', cargaHoraria: '42 créditos',
    resumo: 'Una gestão de negócios e inteligência artificial para liderar a transformação digital das empresas.',
    paraQuem: 'Gestores, empreendedores e profissionais que querem aplicar IA nos negócios.',
    aprende: ['Estratégia e inovação', 'IA aplicada a negócios', 'Dados para tomada de decisão', 'Liderança na era digital'],
  },
  {
    slug: 'mestrado-inteligencia-artificial', nome: 'Mestrado em Inteligência Artificial', nivel: 'mestrado', categoria: 'Mestrado', parceira: 'agtu',
    duracao: 'até 24 meses', modalidade: 'Online, em português', cargaHoraria: '36 créditos',
    resumo: 'Aprofunde-se nos fundamentos e nas aplicações da inteligência artificial.',
    paraQuem: 'Profissionais de tecnologia e de outras áreas que querem dominar a IA.',
    aprende: ['Aprendizado de máquina', 'IA generativa', 'Ética e governança de IA', 'Projetos aplicados'],
  },
  {
    slug: 'mestrado-tecnologias-digitais', nome: 'Mestrado em Tecnologias Digitais', nivel: 'mestrado', categoria: 'Mestrado', parceira: 'agtu',
    duracao: 'até 24 meses', modalidade: 'Online, em português', cargaHoraria: '45 créditos',
    resumo: 'Entenda e aplique as tecnologias que estão transformando organizações e mercados.',
    paraQuem: 'Profissionais que lideram ou querem liderar projetos de transformação digital.',
    aprende: ['Transformação digital', 'Computação em nuvem', 'Inovação e produtos digitais', 'Gestão de projetos de tecnologia'],
  },
  {
    slug: 'mestrado-cybersecurity', nome: 'Mestrado em Cybersecurity', nivel: 'mestrado', categoria: 'Mestrado', parceira: 'agtu',
    duracao: 'até 18 meses', modalidade: 'Online, em português', cargaHoraria: '36 créditos',
    resumo: 'Especialize-se em segurança da informação, uma das áreas com maior falta de profissionais.',
    paraQuem: 'Profissionais de TI e gestores responsáveis por proteger dados e sistemas.',
    aprende: ['Segurança de redes e sistemas', 'Gestão de riscos', 'Resposta a incidentes', 'Conformidade e LGPD'],
  },
  {
    slug: 'mestrado-business-e-esg', nome: 'Mestrado em Business e ESG', nivel: 'mestrado', categoria: 'Mestrado', parceira: 'agtu',
    duracao: 'até 24 meses', modalidade: 'Online, em português', cargaHoraria: '42 créditos',
    resumo: 'Lidere negócios sustentáveis, com governança e responsabilidade social e ambiental.',
    paraQuem: 'Gestores e profissionais que querem atuar com sustentabilidade corporativa.',
    aprende: ['Estratégia ESG', 'Governança corporativa', 'Finanças sustentáveis', 'Relatórios e indicadores'],
  },
  {
    slug: 'mestrado-educacao-e-sustentabilidade', nome: 'Mestrado em Educação e Sustentabilidade', nivel: 'mestrado', categoria: 'Mestrado', parceira: 'agtu',
    duracao: 'até 24 meses', modalidade: 'Online, em português', cargaHoraria: '45 créditos',
    resumo: 'Para educadores que querem inovar e levar a sustentabilidade para dentro da escola.',
    paraQuem: 'Professores, coordenadores e gestores escolares.',
    aprende: ['Inovação na educação', 'Educação ambiental', 'Gestão educacional', 'Pesquisa aplicada'],
  },
  {
    slug: 'mestrado-gestao-de-saude', nome: 'Mestrado em Gestão de Saúde', nivel: 'mestrado', categoria: 'Mestrado', parceira: 'agtu',
    duracao: 'até 24 meses', modalidade: 'Online, em português', cargaHoraria: '36 créditos',
    resumo: 'Prepare-se para gerir clínicas, hospitais e serviços de saúde com eficiência.',
    paraQuem: 'Profissionais da saúde e gestores de instituições de saúde.',
    aprende: ['Gestão hospitalar', 'Qualidade e segurança do paciente', 'Finanças em saúde', 'Saúde digital'],
  },
  {
    slug: 'mestrado-direito', nome: 'Mestrado em Direito', nivel: 'mestrado', categoria: 'Mestrado', parceira: 'agtu',
    duracao: 'até 24 meses', modalidade: 'Online, em português', cargaHoraria: '36 créditos',
    resumo: 'Aprofunde sua formação jurídica com uma visão internacional.',
    paraQuem: 'Advogados e bacharéis em Direito.',
    aprende: ['Direito comparado', 'Direito digital e tecnologia', 'Pesquisa jurídica', 'Temas contemporâneos'],
  },
];

const comArea = (c: CursoBase): Curso => ({ ...c, area: c.area ?? areaPorSlug[c.slug] ?? 'gestao' });

export const cursos: Curso[] = [
  ...outros.filter((c) => c.nivel === 'eja-e-tecnicos').map(comArea),
  ...graduacao,
  ...outros.filter((c) => c.nivel === 'mestrado').map(comArea),
];

export const getNivel =(id: NivelId) => niveis.find((n) => n.id === id)!;
export const cursosDoNivel = (id: NivelId) => cursos.filter((c) => c.nivel === id);
export const mensagemCurso = (c: Curso) => `Olá! Vim pelo site da AURA e quero saber mais sobre o curso ${c.nome}.`;
