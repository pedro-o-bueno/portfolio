# Portfólio — Pedro Henrique Oliveira Bueno

Repositório de portfólio de **Pedro Henrique Oliveira Bueno**, desenvolvedor full-stack. A página inicial do repositório é um hub com apresentação, projetos, experiência e contato, e cada pasta traz um site de demonstração completo, em um nicho e com um estilo visual diferente.

## Sites de demonstração

| Pasta | Site | Nicho | Estilo |
|---|---|---|---|
| `restaurante/` | Cantina do Zé | Restaurante italiano | Quente e elegante, creme/terracota/verde-escuro, serifada |
| `advocacia/` | Ferreira & Almeida Advocacia | Escritório de advocacia | Sóbrio e clássico, azul-marinho/dourado, serifada |
| `academia/` | Iron House Academia | Academia | Escuro e agressivo, preto/vermelho, tipografia condensada |
| `petshop/` | Pata Amiga Pet Shop & Clínica Veterinária | Pet shop e veterinária | Amigável e colorido, verde-água/laranja, cantos arredondados |
| `saas/` | Fluxo | SaaS de gestão financeira | Moderno e limpo, gradiente índigo/violeta, mockup de dashboard em CSS puro |

## Estrutura do repositório

```text
portfolio/
├── index.html          # Hub do portfólio (página inicial do GitHub Pages)
├── README.md
├── restaurante/        # index.html, style.css, script.js
├── advocacia/          # index.html, style.css, script.js
├── academia/           # index.html, style.css, script.js
├── petshop/            # index.html, style.css, script.js
└── saas/               # index.html, style.css, script.js
```

O `index.html` da raiz é autocontido (CSS e JS embutidos, só as fontes vêm do Google Fonts). Cada site de demonstração tem os próprios `index.html`, `style.css` e `script.js`, sem etapa de build.

## O que cada site tem

- Textos realistas em pt-BR: pratos com preços em R$, áreas do direito, planos de academia, serviços e produtos de pet shop, planos de SaaS.
- Sem imagens externas: só gradientes CSS, blocos coloridos e ícones/ilustrações em SVG inline.
- Responsivo (testado mentalmente em 360 px de largura): menu mobile, colunas que empilham.
- JS pequeno: menu mobile, rolagem suave, formulário com mensagem de sucesso (envio simulado, sem backend), accordion de FAQ no SaaS e alternância mensal/anual nos planos do SaaS.

## Como pré-visualizar localmente

Na raiz do repositório, suba um servidor HTTP simples:

```bash
python3 -m http.server 8000
```

Depois abra http://localhost:8000 no navegador para ver o hub, ou http://localhost:8000/restaurante/ (e assim por diante) para cada site de demonstração. Também dá para abrir os arquivos `index.html` direto no navegador, mas o servidor evita qualquer problema de caminho.

## Como ver ao vivo (GitHub Pages)

Com o repositório `portfolio` na conta `pedro-o-bueno` e o Pages ativado em **Settings → Pages** (branch `main`, pasta `/ (root)`), os sites ficam no ar em:

- Hub: https://pedro-o-bueno.github.io/portfolio/
- Restaurante: https://pedro-o-bueno.github.io/portfolio/restaurante/
- Advocacia: https://pedro-o-bueno.github.io/portfolio/advocacia/
- Academia: https://pedro-o-bueno.github.io/portfolio/academia/
- Pet shop: https://pedro-o-bueno.github.io/portfolio/petshop/
- SaaS: https://pedro-o-bueno.github.io/portfolio/saas/

## Contato

- GitHub: https://github.com/pedro-o-bueno
- E-mail: phobueno@gmail.com
- Workana: https://www.workana.com/freelancer/36170a51e5949d9174a9067a0699bb57
- 99Freelas: https://www.99freelas.com.br/user/pedro-henrique-oliveira-bueno

## Atenção

- Os dados dos sites de demonstração são fictícios: nomes de empresas, endereços, telefones, WhatsApp e OABs foram inventados para demonstração. Antes de usar um site como referência real para um cliente, troque os dados pelos dados verdadeiros dele.
- Os formulários são simulados: mostram uma mensagem de sucesso, mas não enviam nada para lugar nenhum.
- As fontes vêm do Google Fonts via `<link>`; sem internet as fontes caem para as alternativas do sistema, mas o layout continua funcionando.
