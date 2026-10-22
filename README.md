# Portfólio do Gabriel

Site estático em HTML, CSS e JavaScript puros. Não precisa de Node, build ou framework.

## Como usar
1. Abra `js/config.js` e troque os textos pelos seus. Tudo que aparece no site vem dali.
2. Abra `index.html` no navegador (clique duas vezes) ou rode `npx serve` dentro da pasta.
3. Rodando no seu computador, um aviso no canto da tela diz quantos campos ainda têm texto de exemplo (os que estão entre `[colchetes]` ou com `seu-`). Ele não aparece para quem visita o site publicado.

## Publicar
Arraste a pasta para o Netlify Drop, ou suba para um repositório e ative o GitHub Pages ou a Vercel. Depois de publicar, edite no `index.html` o `<title>` e a `description` se quiser (o JavaScript já preenche os dois).

## Estrutura
- `index.html`: esqueleto, cabeçalho, braço do violão e rodapé.
- `css/estilo.css`: `@layer` (base, layout, componentes), tokens em variáveis CSS, tema claro e escuro.
- `js/config.js`: **seus dados**.
- `js/app.js`: monta as seções, tema, diálogo de projetos, aviso de campos pendentes.
- `js/instrumento.js`: as cordas (Canvas + Web Audio).

## O que tem por baixo
Container queries (`cqi`), `color-mix()` e `oklch`, `@starting-style` com `<dialog>`, View Transitions API (troca de tema em círculo), Canvas com ondas estacionárias amortecidas, síntese Karplus-Strong no Web Audio, `prefers-reduced-motion` e `prefers-color-scheme`, navegação por teclado, link para pular o conteúdo e região `aria-live`.

## Dicas
- Cordas: passe o cursor, toque nelas, use as teclas 1 a 6 ou os botões no topo do braço. O som começa desligado.
- Outra afinação: troque as frequências em `afinacao` no `config.js`.
- Fontes (Newsreader e Six Caps) vêm do Google Fonts e precisam de internet. Six Caps não tem acentos: evite acento no campo `nome`.
- Para esconder os botões de código/demonstração de um projeto, deixe `repo` e `demo` como `""`.
