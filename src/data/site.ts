// Configurações gerais do site. Valores públicos vêm de variáveis PUBLIC_ (lidas no build).

const rawNumber = (import.meta.env.PUBLIC_WHATSAPP_NUMBER ?? '').replace(/\D/g, '');

export const site = {
  nome: 'AURA Hub Educacional',
  slogan: 'Educação para cada fase da sua vida, em um só lugar.',
  url: 'https://aurasc.com.br',
  whatsapp: rawNumber || '554735148552',
  telefoneExibicao: '(47) 3514-8552',
  endereco: {
    linha1: 'R. Tailândia, 72, sala 18 · Nações',
    linha2: 'Balneário Camboriú · SC',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=R.+Tail%C3%A2ndia%2C+72+-+Na%C3%A7%C3%B5es%2C+Balne%C3%A1rio+Cambori%C3%BA+-+SC',
  },
  razaoSocial: 'AURA Consultoria e Educação Ltda.',
  fundacao: 2019,
  /** Teste vocacional (página própria, termina no WhatsApp da Aurora). */
  vocacionalUrl: 'https://vocacional.aurasc.com.br/',
  gtmId: (import.meta.env.PUBLIC_GTM_ID ?? '').trim(),
  metaPixelId: (import.meta.env.PUBLIC_META_PIXEL_ID ?? '').replace(/\D/g, ''),
};

/** Link do WhatsApp com mensagem já preenchida. */
export function whatsappLink(mensagem = 'Olá! Vim pelo site da AURA e quero saber mais sobre os cursos.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;
}

/** Link para o teste vocacional, marcando de onde o visitante veio (aparece no lead como utm). */
export function vocacionalLink(origem: string) {
  return `${site.vocacionalUrl}?utm_source=site&utm_medium=${encodeURIComponent(origem)}&utm_campaign=teste_vocacional`;
}
