# Guia & Checklist Pré-Lançamento — Casa Grande
### Manual Prático de Revisão para Utilizadores e Anfitriões

Este guia foi elaborado para ser lido e utilizado por **pessoas** (proprietários, anfitriões, designers e gestores de projeto). Em vez de comandos de programação ou códigos técnicos, foca-se naquilo que o hóspede realmente vê, sente, clica e experiencia ao planear e reservar uma estadia na Casa Grande.

---

## Como Utilizar Este Guia
- Pode utilizá-lo diretamente no ecrã ou imprimir para revisão presencial com a anfitriã.
- Cada ponto indica **o que procurar**, **onde testar no website** e **qual o critério de sucesso**.
- A versão interativa com marcação digital e barra de progresso em tempo real está acessível em:
  👉 **[https://danielffmarques.github.io/casagrande/checklist.html](https://danielffmarques.github.io/casagrande/checklist.html)**

---

## 1. Primeira Impressão & Acolhimento na Homepage

> **Objetivo**: Garantir que quem abre o website pela primeira vez sente de imediato o calor humano, a autenticidade e a tranquilidade da Casa Grande.

- [ ] **1.1. O ecrã inicial aparece completo sem obrigar a fazer scroll**
  - **Onde testar**: Abrir a Homepage tanto no telemóvel como no computador.
  - **O que procurar**: A fotografia da Serra da Estrela e a barra de reserva rápida devem caber por inteiro no primeiro ecrã, convidando a explorar sem esforço.
  
- [ ] **1.2. Tom acolhedor e caloroso em vez de jargão imobiliário**
  - **Onde testar**: Ler os textos de "A História" e dos "Alojamentos".
  - **O que procurar**: Fórmulas frias como "moradia unifamiliar" ou "área de implantação" estão totalmente ausentes. Lê-se a história do solar de quatro séculos, o pão fresco de aldeia e o carinho da família.

- [ ] **1.3. Cabeçalho limpo e sem burocracias no topo**
  - **Onde testar**: Observar a barra superior em qualquer página.
  - **O que procurar**: Apenas o logótipo nobre da Casa Grande e por baixo a vila e o concelho (*"Paços da Serra, Gouveia"*). Números burocráticos de registo de AL ficam discretos apenas no rodapé.

- [ ] **1.4. O botão de reserva do cabeçalho só surge após descer a página**
  - **Onde testar**: Fazer scroll para baixo e para cima na página inicial.
  - **O que procurar**: O botão castanho de reserva no topo surge suavemente apenas quando a barra principal do Hero sai do ecrã. Os links de navegação mantêm-se exatamente no mesmo sítio sem nenhum sobressalto visual.

- [ ] **1.5. Opiniões dos hóspedes e fotos deslizam facilmente com o dedo**
  - **Onde testar**: Secção de Opiniões na Homepage.
  - **O que procurar**: Deslizar com o dedo no telemóvel ou arrastar com o rato no computador. O movimento é suave e contínuo, permitindo ler testemunhos do Booking e Airbnb com total conforto.

---

## 2. As 9 Habitações, Fotografias & Clareza de Tarifas

> **Objetivo**: Ajudar o hóspede a escolher a habitação certa para a sua família, ver todas as divisões com detalhe e perceber sem dúvidas quanto vai pagar.

- [ ] **2.1. As setas de passar fotografias funcionam em todas as casas**
  - **Onde testar**: Página de Alojamentos ([alojamentos.html](https://danielffmarques.github.io/casagrande/alojamentos.html)).
  - **O que procurar**: Carregar nas setas `<` e `>` nos cartões das Cameleiras, Ciprestes, Telheiro, Olival, etc. A foto muda com um desvanecer suave, o contador atualiza (ex.: `2 / 8`) e a legenda em baixo explica a divisão.

- [ ] **2.2. A lupa amplia a fotografia em ecrã inteiro sem cortes**
  - **Onde testar**: Ícone de lupa no canto superior esquerdo de cada fotografia.
  - **O que procurar**: A imagem abre grande e nítida com fundo escuro. Fecha facilmente clicando no 'X', fora da imagem ou na tecla `Escape`.

- [ ] **2.3. Preço normal e época festiva apresentados com total transparência**
  - **Onde testar**: Base de cada cartão de alojamento.
  - **O que procurar**: O preço habitual surge em destaque (ex.: **85 € / NOITE**) e, logo por baixo, a indicação clara e discreta: *"Épocas festivas: 95 €/noite"*, para que o hóspede nunca seja surpreendido.

- [ ] **2.4. Filtro por número de hóspedes sugere a casa perfeita**
  - **Onde testar**: Seletor no topo da página de Alojamentos.
  - **O que procurar**: Ao escolher "2 Hóspedes", o catálogo destaca os refúgios ideais para casais; ao escolher "6 Hóspedes", realça as casas de campo familiares com múltiplos quartos.

- [ ] **2.5. O botão "Reservar" de cada casa encaminha já com ela selecionada**
  - **Onde testar**: Clicar em "Reservar" na Casa da Azeitona ou no Solar.
  - **O que procurar**: A página de reservas abre automaticamente com a respetiva habitação pré-selecionada no primeiro passo.

---

## 3. Marcação de Estadias, Faturação & Contacto com a Anfitriã

> **Objetivo**: Fazer com que o ato de reservar seja tão simples, seguro e acolhedor como uma conversa com a anfitriã.

- [ ] **3.1. Nomes simples e limpos no seletor de casas**
  - **Onde testar**: Página de Reservas ([reservas.html](https://danielffmarques.github.io/casagrande/reservas.html)) • Passo 1.
  - **O que procurar**: O menu apresenta apenas os nomes e capacidades das habitações (ex.: *"Apartamento das Cameleiras (1-2 hóspedes)"*), sem redundância de preços no menu.

- [ ] **3.2. Calendário de datas intuitivo e com estadias mínimas**
  - **Onde testar**: Escolha de datas no Passo 2.
  - **O que procurar**: As datas do passado estão bloqueadas. Se alguém tentar marcar apenas 1 noite, o sistema explica carinhosamente o mínimo da propriedade (2 noites normais ou 3 em épocas festivas).

- [ ] **3.3. Bloco opcional de fatura com NIF**
  - **Onde testar**: Passo de Dados Pessoais da Reserva.
  - **O que procurar**: Ao assinalar a caixa *"Desejo fatura com contribuinte (NIF)"*, abrem-se os campos de NIF, Morada Fiscal e Localidade. Se o hóspede já tiver preenchido o seu nome, o campo de Nome Fiscal preenche-se sozinho.

- [ ] **3.4. Pagamento demonstrativo seguro e em tempo real**
  - **Onde testar**: Passo 3 de Pagamento.
  - **O que procurar**: A escolha entre Cartão de Crédito, MB WAY (com campo para número de telemóvel) ou Referência Multibanco reflete-se de imediato no resumo lateral e no botão final de confirmação.

- [ ] **3.5. Comprovativo final com ligação direta de WhatsApp**
  - **Onde testar**: Finalizar uma reserva de teste.
  - **O que procurar**: O ecrã de confirmação resume a estadia e disponibiliza um botão direto para falar no WhatsApp da anfitriã sobre a hora prevista de chegada e boas-vindas.

- [ ] **3.6. Cartão de dúvidas acompanha a leitura nas FAQs**
  - **Onde testar**: Página de Dúvidas Frequentes ([duvidas.html](https://danielffmarques.github.io/casagrande/duvidas.html)).
  - **O que procurar**: Enquanto o visitante lê as respostas sobre aquecimento ou animais, o cartão da anfitriã permanece visível à direita (*sticky*), pronto para receber uma mensagem rápida.

---

## 4. Encontrar a Casa Grande na Internet (Google, Mapas e Redes Sociais)

> **Objetivo**: Garantir que quem procura um refúgio na Serra da Estrela encontra facilmente a Casa Grande e chega sem enganos ao portão.

- [ ] **4.1. Partilha no WhatsApp bonita e profissional**
  - **Onde testar**: Enviar o link do website numa mensagem de WhatsApp para um amigo ou colega.
  - **O que procurar**: Aparece automaticamente a fotografia da fachada do solar com o título *"Casa Grande — Turismo de Habitação & Casas de Campo | Serra da Estrela"* e a breve descrição da quinta.

- [ ] **4.2. O botão de mapa guia exatamente até à porta da quinta**
  - **Onde testar**: Clicar em *"Abrir no Google Maps"* no rodapé.
  - **O que procurar**: A aplicação de navegação do telemóvel (Google Maps ou Waze) abre diretamente no Largo Dr. Luís Mendes Caldeira nº 1, em Paços da Serra, sem desvios para o centro genérico de Gouveia.

- [ ] **4.3. Distâncias e tempos de viagem reais para planear o dia**
  - **Onde testar**: Secção da Serra da Estrela ([actividades.html](https://danielffmarques.github.io/casagrande/actividades.html)).
  - **O que procurar**: As distâncias de carro (*Gouveia 8 km / 10 min, Seia 8 km / 10 min, Vale do Rossim 24 km, Torre 38 km*) estão fáceis de ler numa linha única e correspondem aos trajetos reais de montanha.

- [ ] **4.4. O símbolo da Casa Grande está visível no separador do navegador**
  - **Onde testar**: Olhar para o separador de navegação no topo do ecrã.
  - **O que procurar**: O pequeno ícone distintivo (Favicon) da Casa Grande está nítido e centrado, tanto em computadores como em ecrãs móveis.

---

## 5. Facilidade de Leitura & Conforto para Todas as Pessoas

> **Objetivo**: Que qualquer hóspede — dos jovens aos mais idosos, com óculos ou em ecrãs pequenos ao sol — navegue sem cansaço e sem cometer erros de toque.

- [ ] **5.1. Textos com excelente leitura que não cansam a vista**
  - **Onde testar**: Navegar em todas as páginas.
  - **O que procurar**: O tamanho de letra é generoso e o contraste entre as letras e o fundo é confortável, sem cinzentos muito claros ou letras miudinhas difíceis de decifrar.

- [ ] **5.2. Botões grandes e confortáveis para o polegar no telemóvel**
  - **Onde testar**: Segurar no telemóvel com uma mão e tocar nos botões de reserva, fecho de janelas e setas de fotos.
  - **O que procurar**: Todos os botões têm área de toque suficiente para carregar à primeira sem tocar no link ao lado por acidente.

- [ ] **5.3. Tocar no telefone faz a chamada imediatamente**
  - **Onde testar**: Tocar no número de telemóvel ou telefone fixo no rodapé através de um smartphone.
  - **O que procurar**: O telemóvel abre logo o ecrã de chamada com o número preenchido (+351 934 297 935), pronto a ligar.

- [ ] **5.4. Navegação limpa no teclado para quem utiliza tecnologia assistiva**
  - **Onde testar**: No computador, percorrer a página apenas usando a tecla `Tab`.
  - **O que procurar**: Vê-se com nitidez qual o elemento selecionado a cada momento, e é possível abrir e fechar menus e galerias sem rato.

---

## 6. Confiança, Segurança & Validação com a Anfitriã

> **Objetivo**: Transmitir total credibilidade antes de colocar o website público para o mundo.

- [ ] **6.1. A anfitriã reviu e aprovou as fotografias e preços**
  - **O que verificar**: Confirmação com a proprietária da Casa Grande de que as fotos correspondem fielmente ao estado atual das casas e que os valores por noite coincidem com a política oficial.

- [ ] **6.2. Registo de Alojamento Local e Turismo no rodapé**
  - **Onde testar**: Fundo de qualquer página do website.
  - **O que procurar**: Menção discreta dos registos legais da propriedade para garantia de autenticidade perante os hóspedes e as autoridades.

- [ ] **6.3. Ligação funcional ao Livro de Reclamações Eletrónico**
  - **Onde testar**: Rodapé • Linha legal.
  - **O que procurar**: O link *"Livro de Reclamações"* abre o portal oficial nacional (`livroreclamacoes.pt`) num novo separador.

- [ ] **6.4. Desativação coordenada das notas de transparência**
  - **O que verificar**: No momento do lançamento definitivo, as caixas informativas de protótipo são desligadas em simultâneo em todo o site, apresentando um portal 100% polido e comercial.

---

### Tabela de Rubrica Final de Lançamento

| Área de Revisão | Estado | Validado Por | Data |
| :--- | :---: | :--- | :---: |
| 1. Primeira Impressão & Tom Acolhedor | `[ ] Aprovado` | | |
| 2. Alojamentos, Fotos & Preços | `[ ] Aprovado` | | |
| 3. Reservas, Faturação & WhatsApp | `[ ] Aprovado` | | |
| 4. Google, Mapas & Partilha de Links | `[ ] Aprovado` | | |
| 5. Conforto de Leitura & Telemóvel | `[ ] Aprovado` | | |
| 6. Validação da Anfitriã & Legal | `[ ] Aprovado` | | |

> **Conclusão**: Estando todos os 6 pontos aprovados, o website está pronto para ser partilhado com futuros hóspedes de Portugal e do mundo com a máxima confiança.
