# Portfólio — Pedro Henrique Oliveira Bueno

Repositório de portfólio de **Pedro Henrique Oliveira Bueno**, desenvolvedor full-stack. A página inicial do repositório é um hub com apresentação, projetos, experiência e contato, e cada pasta traz um site de demonstração completo, em um nicho e com um estilo visual diferente.

## Sites de demonstração (11)

| Pasta | Site | Nicho | Estilo |
|---|---|---|---|
| `restaurante/` | Cantina do Zé | Restaurante italiano | Quente e elegante, creme/terracota/verde-escuro, serifada |
| `advocacia/` | Ferreira & Almeida Advocacia | Escritório de advocacia | Sóbrio e clássico, azul-marinho/dourado, serifada |
| `academia/` | Iron House Academia | Academia | Escuro e agressivo, preto/vermelho, tipografia condensada |
| `petshop/` | Pata Amiga Pet Shop & Clínica Veterinária | Pet shop e veterinária | Amigável e colorido, verde-água/laranja, cantos arredondados |
| `saas/` | Fluxo | SaaS de gestão financeira | Moderno e limpo, gradiente índigo/violeta, mockup de dashboard em CSS puro |
| `construtora/` | Vetor Construtora | Construtora de alto padrão | Limpo e premium, branco/carvão com âmbar, tipografia grande |
| `chatbot/` | Clínica Sorriso | Chatbot de WhatsApp p/ agendamento | Leve e moderno, verde de destaque, widget de chat simulado funcional |
| `ecommerce/` | VitaFit Suplementos | Loja virtual de suplementos | Esportivo, verde-escuro/preto com lima, carrinho funcional em JS |
| `dashboard/` | AgendaPro | Agenda online + CRM com Kanban | Dashboard SaaS, fundo claro, sidebar, índigo, Kanban interativo |
| `idiomas/` | Falaí | Escola de idiomas | Leve e ilustrado, com quiz de nível demonstrativo |
| `rastro/` | Rastro | Painel conceitual fictício para freelancers | Editorial, papel/índigo/coral, painel estático e slot VSL 16:9 |

## Estrutura do repositório

```text
portfolio/
├── index.html          # Hub do portfólio (página inicial do GitHub Pages)
├── README.md
├── demo.css            # Aviso compartilhado de demonstração; não padroniza os temas
├── restaurante/        # index.html, style.css, script.js
├── advocacia/          # index.html, style.css, script.js
├── academia/           # index.html, style.css, script.js
├── petshop/            # index.html, style.css, script.js
├── saas/               # index.html, style.css, script.js
├── construtora/        # index.html, style.css, script.js
├── chatbot/            # index.html, style.css, script.js
├── ecommerce/          # index.html, style.css, script.js
├── dashboard/          # index.html, style.css, script.js
├── idiomas/            # index.html, style.css, script.js
└── rastro/             # landing conceitual com espaço estático para VSL
```

O `index.html` da raiz é autocontido (CSS e JS embutidos; as fontes vêm do Google Fonts). Cada demonstração mantém sua própria identidade visual e não exige etapa de build. O `demo.css` fornece apenas o aviso visual de que as interações são demonstrativas.

## O que cada site tem

- Onze experiências estáticas em pt-BR, cada uma com conteúdo e visual próprios. Textos, produtos, pessoas, avaliações, preços, métricas e contatos das demonstrações são exemplos fictícios.
- Os estilos e scripts ficam nos projetos correspondentes; não há backend nem etapa de build. Há imagens locais, gradientes CSS e ilustrações em SVG.
- As interações são locais e demonstrativas: formulários não enviam dados, e ações não reservam horários, matriculam pessoas, criam contas, registram pedidos nem cobram pagamentos.
- Rastro é uma landing de produto fictício; o painel ilustrativo é estático, o espaço para VSL mantém 16:9 e não há cadastro, formulário ou software funcional.
- O chatbot conduz uma conversa de agendamento simulada; o carrinho da VitaFit permite adicionar, remover e alterar itens antes do checkout demonstrativo; o Kanban da AgendaPro move cartões e aceita novos leads apenas na página atual; o quiz Falaí mostra uma classificação de exemplo.

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
- Construtora: https://pedro-o-bueno.github.io/portfolio/construtora/
- Chatbot: https://pedro-o-bueno.github.io/portfolio/chatbot/
- E-commerce: https://pedro-o-bueno.github.io/portfolio/ecommerce/
- Dashboard: https://pedro-o-bueno.github.io/portfolio/dashboard/
- Idiomas: https://pedro-o-bueno.github.io/portfolio/idiomas/
- Rastro: https://pedro-o-bueno.github.io/portfolio/rastro/

## Contato

- GitHub: https://github.com/pedro-o-bueno
- E-mail: phobueno@gmail.com
- Workana: https://www.workana.com/freelancer/36170a51e5949d9174a9067a0699bb57
- 99Freelas: https://www.99freelas.com.br/user/pedro-henrique-oliveira-bueno

## Atenção

- Os dados dos sites de demonstração são fictícios: nomes, endereços, telefones, contatos, OABs, preços, depoimentos e indicadores são apenas exemplos. Antes de usar um site como referência real para um cliente, substitua-os por informações verificadas.
- Formulários e ações são simulados e não enviam dados para lugar nenhum. Não use informações reais, especialmente dados pessoais ou sensíveis.
- As fontes vêm do Google Fonts via `<link>`; sem internet as fontes caem para as alternativas do sistema, mas o layout continua funcionando.
