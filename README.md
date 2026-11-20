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

Os cursos ficam em `src/data/cursos.ts`. Cada item em `cursos` gera uma página em `/cursos/<slug>/`. As páginas por nível são `/eja-e-tecnicos/`, `/graduacao/`, `/pos-graduacao/` e `/mestrado/`.

## Pendências

- Trocar os blocos de cor por fotos reais (polo, equipe, alunos).
- Confirmar valores e condições com as parceiras antes de anunciar.
- Conferir as regras de uso das marcas UNIFAEL, CEFE Educa e AGTU.
