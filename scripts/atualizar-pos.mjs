// Atualiza a tabela de pós-graduações do site a partir do CSV do simulador (o mesmo da Aurora).
//
//   node scripts/atualizar-pos.mjs "C:\caminho\pos_unifael_<mes>.csv"
//
// Grava src/data/pos-unifael.csv SOMENTE com as colunas que o site mostra.
// Valor cheio e % de desconto ficam de fora de propósito: o repositório é público.

import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const origem = process.argv[2];
const destino = new URL('../src/data/pos-unifael.csv', import.meta.url);
if (!origem) {
  console.error('Uso: node scripts/atualizar-pos.mjs <arquivo.csv>');
  process.exit(1);
}

const linhas = readFileSync(origem, 'utf8').replace(/^\uFEFF/, '').split(/\r?\n/).filter((l) => l.trim());
const cab = linhas.shift().split(';').map((c) => c.trim());
const col = (nome) => {
  const i = cab.indexOf(nome);
  if (i < 0) throw new Error(`Coluna "${nome}" não encontrada no CSV.`);
  return i;
};
const iCurso = col('curso');
const iArea = col('area');
const iDur = col('duracao_meses');
const iParc = col('parcelas');
const iBoleto = col('mensalidade_boleto_ate_dia8');
const iCartao = col('mensalidade_cartao');
const iVig = col('vigencia');

const saida = ['curso;area;duracao_meses;parcelas;boleto;cartao;vigencia'];
for (const l of linhas) {
  const c = l.split(';').map((x) => x.trim());
  saida.push([c[iCurso], c[iArea], c[iDur], c[iParc], c[iBoleto], c[iCartao], c[iVig]].join(';'));
}

const antes = existsSync(destino) ? readFileSync(destino, 'utf8').split('\n').filter(Boolean).length - 1 : 0;
writeFileSync(destino, saida.join('\n') + '\n', 'utf8');
console.log(`OK: ${saida.length - 1} cursos gravados em src/data/pos-unifael.csv (antes: ${antes}).`);
console.log('Agora faça commit/push e o deploy no Easypanel.');
