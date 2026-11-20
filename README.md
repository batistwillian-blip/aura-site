# AURA Hub Educacional · site

Site institucional de **aurasc.com.br**. É gerado em [Astro](https://astro.build) como site estático e servido por um servidor Node mínimo, sem dependências.

## Rodar localmente

```bash
npm ci
npm run dev        # desenvolvimento em http://localhost:4321
npm run build      # gera a pasta dist/
npm start          # serve dist/ em 0.0.0.0:${PORT:-3000}
```

Requer Node 20 ou mais recente.

## Publicar (Easypanel + Nixpacks)

| Item | Valor |
|---|---|
| Repositório | `batistwillian-blip/aura-site`, branch `main` |
| Instalação | `npm ci` |
| Build | `npm run build` |
| Início | `npm start` (escuta em `0.0.0.0` na porta `PORT`, padrão 3000) |
| Porta | 3000 |
| Health check | `GET /healthz` |

### Variáveis de ambiente (todas públicas, lidas no **build**)

| Nome | Exemplo | Uso |
|---|---|---|
| `PUBLIC_WHATSAPP_NUMBER` | `554735148552` | Número dos botões de WhatsApp (55 + DDD + número, só dígitos) |
| `PUBLIC_GTM_ID` | `GTM-XXXXXXX` | Google Tag Manager (opcional) |
| `PUBLIC_META_PIXEL_ID` | `1234567890` | Pixel da Meta (opcional) |

Por serem lidas no build, qualquer mudança nelas exige um novo deploy. Nunca coloque senhas ou tokens no repositório: ele é público.

Os cliques no WhatsApp enviam o evento `whatsapp_click` para o dataLayer e `Contact` para o Pixel.

## Editar cursos

- EJA, técnicos e mestrados: `src/data/cursos.ts`
- Graduações UNIFAEL (39): `src/data/graduacao.ts`
- Pós-graduações UNIFAEL (263): `src/data/pos.ts`, com os valores em `src/data/pos-unifael.csv` e o conteúdo (sobre, objetivos, disciplinas e público) em `src/data/pos-conteudo.json`

Cada curso gera uma página em `/cursos/<slug>/`. As páginas por nível são `/eja-e-tecnicos/`, `/graduacao/`, `/pos-graduacao/` e `/mestrado/`.

**Regra:** o site nunca linka para páginas de inscrição ou matrícula das parceiras. Todo contato vai direto para o WhatsApp. Só a pós mostra valores; os demais níveis ficam com a Aurora.

### Atualizar os valores da pós (todo mês)

1. Exporte o CSV do simulador do mês (o mesmo da Aurora, separado por `;`).
2. Rode `node scripts/atualizar-pos.mjs "<caminho do csv>"`. O script grava só as colunas que o site mostra: o valor cheio e o % de desconto não vão para o repositório, que é público.
3. Faça commit, push e o deploy no Easypanel.

O site mostra a mensalidade no boleto com pagamento até o dia 8, a mensalidade no cartão (na página do curso) e o mês de vigência. Um curso novo no CSV ganha página automaticamente, com um texto padrão da área enquanto não houver conteúdo dele em `pos-conteudo.json`.

## Fotos

Cada curso tem uma `area` (veja `src/data/areas.ts`), e a foto do card vem de `src/assets/areas/<area>.jpg`. Para trocar uma foto, substitua o arquivo, mantendo o mesmo nome. O build gera versões WebP otimizadas, com cerca de 25 KB em média, e elas carregam só quando aparecem na tela. Sem foto, o card usa o gradiente da área. As origens estão em `src/assets/areas/CREDITOS.md`.

## Pendências

- Trocar os blocos de cor por fotos reais (polo, equipe, alunos).
- Confirmar valores e condições com as parceiras antes de anunciar.
- Conferir as regras de uso das marcas UNIFAEL, CEFE Educa e AGTU.
