// Gera public/teste-vocacional/index.html a partir da versão original (UNIFAEL) do teste,
// trocando SÓ o visual e os textos de marca. Lógica, pesos, Pixel, webhooks e WhatsApp ficam iguais.
//
//   node scripts/vocacional/gerar.mjs <original.html>
//
// O original é o index.html do briefing (o mesmo servido hoje em vocacional.aurasc.com.br).

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const origem = process.argv[2];
if (!origem) { console.error('Uso: node scripts/vocacional/gerar.mjs <original.html>'); process.exit(1); }
let h = readFileSync(origem, 'utf8').replace(/\r\n/g, '\n');
const css = readFileSync(new URL('./aura.css', import.meta.url), 'utf8');
const troca = (a, b) => { if (!h.includes(a)) throw new Error('Trecho não encontrado: ' + a.slice(0, 70)); h = h.replace(a, b); };

// ---- cabeçalho ----
troca('<title>Descubra sua vocação | Teste gratuito UNIFAEL Balneário Camboriú</title>',
      '<title>Descubra sua vocação | Teste gratuito AURA Hub Educacional</title>');
troca('Teste vocacional gratuito com resultado na hora. UNIFAEL, polo Balneário Camboriú.">',
      'Teste vocacional gratuito com resultado na hora. AURA Hub Educacional, Balneário Camboriú.">');
troca('<meta property="og:description" content="Teste vocacional gratuito, resultado na hora. UNIFAEL Balneário Camboriú.">',
      '<meta property="og:description" content="Teste vocacional gratuito, resultado na hora. AURA Hub Educacional, Balneário Camboriú.">\n<link rel="canonical" href="https://vocacional.aurasc.com.br/">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">');
troca('<meta name="theme-color" content="#0b5132">', '<meta name="theme-color" content="#0D0820">');
troca('family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      'family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

// ---- estilos ----
const i = h.indexOf('<style>'), j = h.indexOf('</style>');
if (i < 0 || j < 0) throw new Error('bloco <style> não encontrado');
h = h.slice(0, i) + '<style>\n' + css + '</style>' + h.slice(j + '</style>'.length);

// ---- marca ----
const logo = `<svg viewBox="0 0 132 40" role="img" aria-label="AURA Hub Educacional"><rect x="0" y="2" width="36" height="36" rx="10.8" fill="#6411E8"/><circle cx="28.2" cy="9.2" r="3.6" fill="#fff" opacity=".55"/><text x="18" y="29" text-anchor="middle" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-weight="800" font-size="23" fill="#fff">a</text><text x="45" y="23" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-weight="800" font-size="21" letter-spacing="-.8" fill="#2A0A6B">aura</text><text x="46" y="35" font-family="Plus Jakarta Sans, system-ui, sans-serif" font-weight="600" font-size="8.5" fill="#5E5A70">hub educacional</text></svg>`;
troca('<div class="marca" id="marca">UNIFAEL <small>· Polo BC</small></div>', `<div class="marca" id="marca">${logo}</div>`);
troca('<span style="width:56px"></span>', '<span style="width:64px"></span>');
troca('<div class="capa">\n', '<div class="capa">\n      <span class="luz" aria-hidden="true"></span>\n');
troca('<span class="selo">✨ Teste de vocação gratuito</span>', '<span class="selo">✨ Teste vocacional gratuito</span>');

// ---- textos de marca ----
troca('Leva menos tempo que um café ☕ · Um teste da UNIFAEL Balneário Camboriú',
      'Leva menos tempo que um café ☕ · Um teste da AURA Hub Educacional');
troca('Seus dados ficam só com a UNIFAEL Balneário Camboriú.', 'Seus dados ficam só com a AURA Hub Educacional.');
troca('<div id="avisoExtra"></div>',
      '<p class="diploma">Graduações da <b>UNIFAEL</b>, com matrícula e acompanhamento no polo <b>AURA</b> em Balneário Camboriú. O diploma é emitido pela UNIFAEL.</p>\n    <div id="avisoExtra"></div>');
troca('*Valores de referência da UNIFAEL para o polo de Balneário Camboriú; podem mudar.',
      '*Valores de referência da UNIFAEL para o polo AURA de Balneário Camboriú; podem mudar.');
troca("'Oi! Fiz o teste vocacional da UNIFAEL 🎓 Meu perfil deu *'",
      "'Oi! Fiz o teste vocacional da AURA 🎓 Meu perfil deu *'");

if (/UNIFAEL Balneário Camboriú|lima\)|#0b5132/.test(h)) throw new Error('Sobrou marca ou cor antiga.');
mkdirSync(new URL('../../public/teste-vocacional/', import.meta.url), { recursive: true });
writeFileSync(new URL('../../public/teste-vocacional/index.html', import.meta.url), h);
console.log('OK: public/teste-vocacional/index.html');
